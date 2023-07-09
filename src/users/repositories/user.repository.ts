import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/users/models/user.schema";
import { SearchUserDto } from "src/auth/dto/search-user.dto";
import {  PatchUserDto } from "src/auth/dto/patch-user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(user: User): Promise<UserDocument> {
        return await this.userModel.create(user);
    }

    async findAll(param:SearchUserDto): Promise<UserDocument[]> {
        return await this.userModel.find(param);
    }

    async findById(id: Types.ObjectId): Promise<UserDocument> {
        return await this.userModel.findById(new Types.ObjectId(id));
    }

    async findEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email })

    }
  

    async delete(id: Types.ObjectId) {
        return await this.userModel.deleteOne({ _id: id });
    }
    async find(searchQuery: any) {
        return await this.userModel.find(searchQuery)
    }

    async findByUserName(username: string) {
        return await this.userModel.findOne({ username: username })
    }
    async findByDepartmentId (id:Types.ObjectId):Promise<User[]>{
        
       
        return await this.userModel.find({departmentId:new Types.ObjectId(id)})
    }
    async update( patchDto:PatchUserDto) {
        return await this.userModel.updateOne({_id:patchDto._id},{departmentId:new Types.ObjectId(patchDto.departmentId)})
    }

}

