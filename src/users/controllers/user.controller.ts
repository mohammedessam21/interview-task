import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Types } from 'mongoose';
import { Roles } from '../role.decorator';
import { Role } from '../role.enum';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SearchUserDto } from 'src/auth/dto/search-user.dto';
import { RolesGuard } from '../roles.guard';

@Controller('users')

export class UserController {


    constructor(private userService: UserService) { }
    @Get()
    @Roles(Role.SUPER_ADMIN, Role.DEPARTMENT_MANAGER)
    async findAll(@Query() param: SearchUserDto, @Req() request: Request) {
        return await this.userService.findAll(param, request)

    }


    @Post()

    @Roles(Role.SUPER_ADMIN)
    async create(@Body() usercreatedto: CreateUserDto) {
        return await this.userService.create(usercreatedto)
    }
    @Get('/:id')
    @Roles(Role.SUPER_ADMIN)
    async findById(@Param('id') id: Types.ObjectId) {

        return await this.userService.findById(id)
    }

    @Delete('/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    async deleteById(@Param('id') id: Types.ObjectId) {
        return await this.userService.deleteById(id,)
    }
    @Patch(':id')
    @Roles(Role.SUPER_ADMIN)
    async update(@Body() departmentId: Types.ObjectId) {
        return await this.userService.update(departmentId)
    }

}