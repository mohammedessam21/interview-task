import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Department, DepartmentDocument } from 'src/department/models/department.model';
import { DepartmentRepository } from '../repositories/department.repository';
import { plainToInstance } from 'class-transformer';
import { Role } from 'src/users/role.enum';
import { UserService } from 'src/users/services/user.service';
import { CreateDepartmentDto } from '../dto/created-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { SearchDepartmentDto } from '../dto/search-department.dto';

@Injectable()
export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository,
        private userService: UserService) { }


    async findAll(searchDepartmentDto:SearchDepartmentDto) {
        if (Object.keys(searchDepartmentDto).length > 0){
            return await this.search(searchDepartmentDto);

        }
        return await this.departmentRepository.findAll(searchDepartmentDto);
    }

    async create(createDepartmentDto:CreateDepartmentDto): Promise<DepartmentDocument> {
        const department = plainToInstance(Department,createDepartmentDto );
        return await this.departmentRepository.create(department);
    }

    async search(SearchDepartmentDto:SearchDepartmentDto){
        const { name, location, field, departmentId } = SearchDepartmentDto;
        const searchQuery = {};
        if (name) {
            searchQuery["name"] = name;
        }
        if (location) {
            searchQuery["location"] = location
        }
        if (departmentId) {
            searchQuery["departmentId"] = departmentId
        }
        if (field) {
            searchQuery["field"] = field
        }

        return await this.departmentRepository.search(searchQuery)
    }

    async delete(id: Types.ObjectId) {
        return await this.departmentRepository.delete(id);
    }

    async update( updateDepartmentDto:UpdateDepartmentDto, request: Request){
        const loggedInUser = await this.userService.findById(request["user"].sub);
        if (loggedInUser.roles.includes(Role.DEPARTMENT_MANAGER) && loggedInUser.departmentId !== updateDepartmentDto.departmentId) {
            throw new UnauthorizedException();
        }
        return await this.departmentRepository.update(updateDepartmentDto)
    }

}