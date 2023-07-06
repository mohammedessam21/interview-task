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
        PassportModule.register({ defaultStrategy: 'jwt' }),   //cant understand . where is keywords and where naming 
        JwtModule.register({
            // imports: [ConfigModule], // i done this 
            // inject: [ConfigService], // we did this to useenv file but whyy
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
