import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { DepartmentService } from '../services/department.service';
import { Roles } from 'src/users/role.decorator';
import { Role } from 'src/users/role.enum';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { CreateDepartmentDto } from '../dto/created-department.dto';
import { SearchDepartmentDto } from '../dto/search-department.dto';


@Controller('department')
export class DepartmentController {
    constructor(private departmentservice: DepartmentService) { }

    @Get()
    @Roles(Role.SUPER_ADMIN)
    async findAll(searchDepartmentDto:SearchDepartmentDto) {
        return await this.departmentservice.findAll(searchDepartmentDto);
    }

    @Post()
    @Roles(Role.SUPER_ADMIN)
    async create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return await this.departmentservice.create(createDepartmentDto)
    }

    @Delete(':id')
    @Roles(Role.SUPER_ADMIN)
    async delete(@Param('id') id: Types.ObjectId) {
        return await this.departmentservice.delete(id)
    }
    @Patch(':id')
    @Roles(Role.SUPER_ADMIN, Role.DEPARTMENT_MANAGER)
    async update(@Body() updateDepartmentDto: UpdateDepartmentDto, @Req() request: Request) {
        return await this.departmentservice.update(updateDepartmentDto, request)
    }


}