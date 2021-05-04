import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@/users/user.module';
import { LocalStrategy } from '@/auth/local/local.strategy';
import { AuthService } from '@/auth/auth.service';
import { jwtConstants } from '@/auth/auth.constants';
import { JwtStrategy } from '@/auth/jwt/jwt.strategy';
import { AuthController } from '@/auth/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
