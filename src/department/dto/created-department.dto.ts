import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";



export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    location: string;
    @IsNotEmpty()
    @IsString()
    field: string;
    @IsNotEmpty()
    @IsString()
    departmentId: Types.ObjectId;
}