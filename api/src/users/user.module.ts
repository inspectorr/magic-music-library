import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { userProviders } from '@/users/service/user.providers';
import { DatabaseModule } from '@/database/database.module';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
