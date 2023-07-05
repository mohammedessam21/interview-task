import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://mohammedessam97:4S225QSVnDFrMB8U@cluster0.0ufmqqa.mongodb.net/"), UserModule, DepartmentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule { }
