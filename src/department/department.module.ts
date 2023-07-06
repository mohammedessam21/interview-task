import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentRepository } from './repositories/department.repository';
import { DepartmentService } from './services/department.service';
import { Department, DepartmentSchema } from './models/department.model';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }]), UserModule],
  controllers: [DepartmentController],
  providers: [DepartmentRepository, DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule { }