import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from '@/users/service/user.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CrudController } from '@/support/controller/crud.controller';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Roles('admin')
@Controller('users')
export class UserController extends CrudController {
  constructor(readonly service: UserService) {
    super(service);
  }
}
