import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { Department, DepartmentDocument } from "src/department/models/department.model";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { SearchDepartmentDto } from "../dto/search-department.dto";

@Injectable()
export class DepartmentRepository {
    constructor(@InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>) { }

    async create(department: Department): Promise<DepartmentDocument> {
        return await this.departmentModel.create(department);
    }

    async findAll(searchDepartmentDto:SearchDepartmentDto): Promise<DepartmentDocument[]> {
        return await this.departmentModel.find();
    }

    async search(searchQuery: any) {
        

        return await this.departmentModel.find(searchQuery)
    }

    async delete(id: Types.ObjectId){
        return await this.departmentModel.deleteOne({ _id: id });
    }
    
    async update(updateQuery: any) {
       
        return await this.departmentModel.updateOne({_id:updateQuery.departmentId},updateQuery)
    }
}

