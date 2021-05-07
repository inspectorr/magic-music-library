import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '@/support/service/crud.service';
import { UserEntity } from '@/users/model/user.entity';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UserService extends CrudService {
  @Inject('USER_REPOSITORY') repository: Repository<UserEntity>;

  async register(registerUserDto: RegisterUserDto, role = 'user') {
    const payload = {
      ...registerUserDto,
      password: await UserEntity.hashPassword(registerUserDto.password),
      role
    };

    return super.create(payload);
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
    return await super.getOneBy('email', email);
  }

  async update(id: number, { name, role }: UpdateUserDto, byUser: UserEntity) {
    if (id === byUser.id) { // user can't change his own role
      role = byUser.role;
    }

    return super.updateById(id, { name, role });
  }
}
