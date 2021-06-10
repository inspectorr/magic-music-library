import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '@/support/service/crud.service';
import { UserEntity } from '@/users/model/user.entity';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UserService extends CrudService {
  @Inject('USER_REPOSITORY') repository: Repository<UserEntity>;
  options = { relations: ['genres'] };

  async register(registerUserDto: RegisterUserDto, byUser: UserEntity, role = 'user') {
    const payload = {
      ...registerUserDto,
      password: await UserEntity.hashPassword(registerUserDto.password),
      role
    };

    return super.create(payload, byUser);
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
    return await super.getOne({ where: { email } });
  }

  async updateById(id: number, { name, role }: UpdateUserDto, byUser: UserEntity) {
    let payload = { name } as any;

    if (
        ['admin', 'user'].includes(role) &&
        Number(id) !== Number(byUser.id)
    ) {
      payload.role = role;
    }

    return super.updateById(id, payload, byUser);
  }
}
