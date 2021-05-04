import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '@/support/service/crud.service';
import { UserEntity } from '@/users/model/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { RegisterAdminDto } from '@/users/dto/register-admin.dto';

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

  async inviteAdmin(dto: RegisterUserDto | RegisterAdminDto) {
    const found = await this.getOneByEmail(dto.email);
    if (found) {
      await this.repository.update({ email: found.email }, { role: 'admin' });
      return { email: dto.email };
    }


    if (!(dto as RegisterUserDto).name) { // todo better validation
      throw new HttpException(`Can't create new admin account without details.`, 400);
    }

    return this.register(dto as RegisterUserDto, 'admin');
  }
}
