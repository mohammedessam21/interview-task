import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type DepartmentDocument = Department & Document;

@Schema({
    timestamps: true,
})
export class Department { 
    @Prop({ required: true })
    name: string;
    @Prop()
    location :string;
    @Prop()
    field:string;
    @Prop()
    departmentId:Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);