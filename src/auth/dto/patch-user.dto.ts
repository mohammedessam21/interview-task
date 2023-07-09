import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class PatchDto {
    @IsNotEmpty()
    _id:Types.ObjectId;

    @IsNotEmpty()
    departmentId: Types.ObjectId;
}