import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from '@/database/database.module';
import { UserService } from './service/user.service';
import { Connection } from 'typeorm';
import { UserEntity } from '@/users/model/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) =>
        connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
