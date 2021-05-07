import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from '@/users/service/user.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

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

  @Put(':id')
  @Roles('admin')
  update(@Body() user: UpdateUserDto, @Param('id') id: string, @Request() req) {
    return this.usersService.update(Number(id), user, req.user);
  }
}
