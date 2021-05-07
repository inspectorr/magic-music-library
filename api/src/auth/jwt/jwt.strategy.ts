import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '@/auth/auth.constants';
import { UserEntity } from '@/users/model/user.entity';
import { UserService } from '@/users/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: function(req) {
        return req?.cookies?.['token'];
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: UserEntity): Promise<UserEntity> {
    return this.userService.getOneByEmail(user.email);
  }
}
