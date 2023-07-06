import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";



export class SearchDepartmentDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    location: string;
    @IsOptional()
    @IsString()
    field: string;
    @IsOptional()
    @IsString()
    departmentId: Types.ObjectId;
}