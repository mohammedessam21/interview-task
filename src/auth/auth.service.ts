import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserDocument } from '../users/models/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        
        private jwtService: JwtService,
       
        private userService: UserService,

    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
        createUserDto.password = hashedPassword;

        return await this.userService.create(createUserDto)
        

    }

    async login(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid  password');
        }

        return { token: await this.jwtService.signAsync({ sub: user._id, username: email }) };
    }
}
