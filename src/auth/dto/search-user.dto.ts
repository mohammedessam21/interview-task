import {  IsOptional, IsString } from "class-validator";
import { Role } from "src/users/role.enum";
import { Types } from "mongoose";

export class SearchUserDto {
    @IsOptional()
    id?:Types.ObjectId
    @IsOptional()
    @IsString()
    roles?:Role
    @IsOptional()
    @IsString()
    departmentId?:Types.ObjectId
    @IsOptional()
    @IsString()
    email?: string
    @IsOptional()
    @IsString()
    username?: string
}