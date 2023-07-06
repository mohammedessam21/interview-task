import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/users/role.enum";
import { Types } from "mongoose";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsOptional()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @IsString()
    departmentId: Types.ObjectId
    @IsNotEmpty()
    @IsString()
    roles: Role[]
}
