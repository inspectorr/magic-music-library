import { getConnection, Repository } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { BaseDto } from '@/support/model/base.dto';
import { UserEntity } from '@/users/model/user.entity';

export class CrudService {
  repository: Repository<BaseEntity>;

  constructor(readonly options: any = {}) {}

  qb(): any {
    return this.connect().createQueryBuilder();
  }

  connect() {
    return getConnection();
  }

  async create(baseDto: BaseDto, byUser: UserEntity): Promise<any> {
    const {
      identifiers: [{ id }],
    } = await this.repository.insert({ ...baseDto });
    return { ...baseDto, id };
  }

  getAll(options = {}): Promise<any[]> {
    return this.repository.find({  ...this.options, ...options });
  }

  getOne(options: any = {}): Promise<any> {
    return this.repository.findOne({ ...this.options, ...options });
  }

  async updateById(id: number, partial: any, byUser: UserEntity): Promise<any> {
    await this.repository.update({ id }, { ...partial });
    return this.getOne({ where: { id }, ...this.options });
  }
}
