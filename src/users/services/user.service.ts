import { Injectable} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SearchUserDto } from 'src/auth/dto/search-user.dto';
import { Role } from '../role.enum';
import { User, UserDocument } from 'src/users/models/user.schema';
import { PatchUserDto } from 'src/auth/dto/patch-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }


    async findAll(searchUserDto: SearchUserDto, request: Request):Promise<User[]> {
        const loggedInUser = await this.findById(request["user"].sub);
       
        

        if (Object.keys(searchUserDto).length > 0 && loggedInUser.roles.includes(Role.DEPARTMENT_MANAGER) && loggedInUser.departmentId) {
            searchUserDto.departmentId = loggedInUser.departmentId;
            
            return await this.search(searchUserDto);
          } else if (loggedInUser.roles.includes(Role.DEPARTMENT_MANAGER) && loggedInUser.departmentId) {
            console.log(loggedInUser.departmentId)
            return await this.findByDepartmentId(loggedInUser.departmentId);
          } else if (Object.keys(searchUserDto).length > 0 )
          {
           
            return await this.search(searchUserDto)
          }
          else {
            return await this.userRepository.findAll(searchUserDto);
          }
    }

    async findByDepartmentId(id: Types.ObjectId):Promise<User[]> {
        return await this.userRepository.findByDepartmentId(id)
    }

    async create(usercreatedto: CreateUserDto): Promise<UserDocument> {
        const user = plainToInstance(User, usercreatedto);
       user.departmentId=new Types.ObjectId(user.departmentId)
        return await this.userRepository.create(user);
    }


    async findById(id: Types.ObjectId): Promise<UserDocument>  {
        return await this.userRepository.findById(id)
    }

    async findByEmail(email: string) : Promise<UserDocument> {
        return await this.userRepository.findEmail(email)
    }

    async search(searchUserdto: SearchUserDto)  {
        const { username, email, roles, departmentId } = searchUserdto;
        const searchQuery = {};
        if (username) {
            searchQuery["username"] = username;
        }
        if (email) {
            searchQuery["email"] = email
        }
        if (departmentId) {
            searchQuery["departmentId"] = departmentId
        }
        if (roles) {
            searchQuery["roles"] = roles
        }

        return await this.userRepository.find(searchQuery)
    }

    async deleteById(id: Types.ObjectId) {



        return await this.userRepository.delete(id)

    }
    async findByUsername(username: string): Promise<UserDocument>  {
        return await this.userRepository.findByUserName(username)

    }
    async update(patchDto:PatchUserDto) {
        return await this.userRepository.update(patchDto) 
    }
}