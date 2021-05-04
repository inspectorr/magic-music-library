import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '@/users/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/auth/dto/login.dto';
import { UserEntity } from '@/users/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.userService.getOneByEmail(email);
    return Boolean(user && (await user.comparePassword(password)));
  }

  async login(user: LoginDto): Promise<string> {
    const { email, password } = user;

    if (await this.validate(email, password)) {
      return this.jwtService.sign({ email });
    }

    throw new HttpException('Incorrect email or password', 401);
  }

  async getProfile(email: string): Promise<UserEntity> {
    return this.userService.getOneByEmail(email);
  }
}
