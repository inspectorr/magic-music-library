import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { AuthModule } from '@/auth/auth.module';
import { RolesGuard } from '@/auth/roles/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      UserModule,
      AuthModule,
      ConfigModule.forRoot({ envFilePath: `.env.local` }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
