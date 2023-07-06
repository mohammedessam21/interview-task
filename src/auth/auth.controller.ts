import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto} from './dto/create-user.dto';
import { Public } from 'src/users/puplic.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
 async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('/login')
 async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
