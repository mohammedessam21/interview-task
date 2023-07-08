import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../users/models/user.schema';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/users/user.module';


@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),   
        JwtModule.register({
            // imports: [ConfigModule], // 
            // inject: [ConfigService], // 
            /*useFactory:*/ /*(config: ConfigService) => */

            global: true,
            secret: 'mohammedessam',
            signOptions: {
                expiresIn: '3d',
            },



        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [PassportModule],
})
export class AuthModule { }
