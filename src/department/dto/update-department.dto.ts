import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";



export class UpdateDepartmentDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    location: string;
    @IsOptional()
    @IsString()
    field: string;
    @IsNotEmpty()
    @IsString()
    departmentId: Types.ObjectId;
}