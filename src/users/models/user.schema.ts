import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document, Types } from 'mongoose';
import { Department } from '../../department/models/department.model';

import { Role } from 'src/users/role.enum';


export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop()
    lastName: string

    @Prop()
    username: string

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: Types.ObjectId, ref: Department.name  })
    departmentId: Types.ObjectId;

    @Prop()
    roles: Role[]

}

export const UserSchema = SchemaFactory.createForClass(User);