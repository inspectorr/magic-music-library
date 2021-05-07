import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/auth.constants';
import { UserService } from '@/users/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        let token = request.cookies.token;

        const authHeader = request.headers['authorization'];
        if (!token && authHeader) {
            token = authHeader && authHeader.split(' ')[1];
        }

        try {
            const userDecoded = await this.jwtService.verify(token, {secret: jwtConstants.secret});
            const user = await this.userService.getOneByEmail(userDecoded.email);

            return roles.includes(user.role);
        } catch(err) {
            return false;
        }
    }
}
