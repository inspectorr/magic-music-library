import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '@/users/service/user.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @Roles('admin')
  getAll() {
    return this.usersService.getAll();
  }
}
