import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { UserService } from '@/users/service/user.service';
import { Roles } from '@/auth/roles/roles.decorator';
import { RegisterAdminDto } from '@/users/dto/register-admin.dto';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@ApiTags('Authentication')
export class AuthController {
  constructor(
      private authService: AuthService,
      private usersService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Put('inviteAdmin')
  inviteAdmin(@Body() admin: RegisterAdminDto) {
    return this.usersService.inviteAdmin(admin);
  }
}
