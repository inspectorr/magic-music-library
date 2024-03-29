import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { UserService } from '@/users/service/user.service';
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
  register(@Body() createUserDto: RegisterUserDto, @Request() req) {
    return this.usersService.register(createUserDto, req.user);
  }

  @Post('login')
  async login(@Body() user: LoginDto, @Res() res) {
    const token = await this.authService.login(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });
    res.json({ token });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res) {
    req.logout();
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    }).json({
      success: true
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.email);
  }
}
