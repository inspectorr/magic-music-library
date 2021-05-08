import { getConnection, Repository } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { BaseDto } from '@/support/model/base.dto';
import { UserEntity } from '@/users/model/user.entity';

export class CrudService {
  repository: Repository<BaseEntity>;

  constructor(readonly options: any = {}) {}

  qb() {
    return getConnection().createQueryBuilder();
  }

  async create(baseDto: BaseDto, byUser: UserEntity): Promise<BaseEntity> {
    const {
      identifiers: [{ id }],
    } = await this.repository.insert(baseDto);
    return { ...baseDto, id };
  }

  getAll(options = {}): Promise<any[]> {
    return this.repository.find({  ...this.options, ...options });
  }

  getOneBy(column: string, value: any, options: any = {}): Promise<any> {
    return this.repository.findOne({ [column]: value, ...this.options, ...options });
  }

  async updateById(id: number, partial: any, byUser: UserEntity): Promise<any> {
    // @ts-ignore
    await this.repository.update({ id }, partial);
    return this.getOneBy('id', id, this.options);
  }
}
