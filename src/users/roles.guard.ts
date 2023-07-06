
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';
import { UserService } from './services/user.service';
import { Types } from 'mongoose';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = await this.userService.findById(new Types.ObjectId(request["user"].sub))
    console.log('context', request["user"]);
    console.log("roles", user.roles);
    let flag: boolean;
    for (let i = 0; i < requiredRoles.length; i++) {

      flag = (user.roles?.includes(requiredRoles[i]));
      if (flag === true) return flag; break;
    }
   

    console.log("b", flag);
    return flag;
  }
}