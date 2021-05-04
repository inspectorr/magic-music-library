import { Repository } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { BaseDto } from '@/support/model/base.dto';

export class CrudService {
  repository: Repository<BaseEntity>;

  async create(baseDto: BaseDto) {
    const {
      identifiers: [{ id }],
    } = await this.repository.insert(baseDto);
    return { ...baseDto, id };
  }

  async getAll(...args): Promise<any[]> {
    return this.repository.find(...args);
  }

  async getOneBy(column: string, value: any): Promise<any> {
    return this.repository.findOne({ [column]: value });
  }
}
