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

  async create(dto: BaseDto, byUser: UserEntity): Promise<any> {
    const {
      identifiers: [{ id }],
    } = await this.repository.insert({ ...dto, ...(byUser ? { createdByUserId: byUser.id } : {}) });
    const created = await this.getOne({ where: { id }, ...this.options });
    await this.updateRelationsOnUpdate(created, dto);
    return this.getOne({ where: { id }, ...this.options });
  }

  async getAll(options = {}): Promise<any[]> {
    return (await this.repository.find({  ...this.options, ...options }))
        .map((e) => this.mapEntity(e));
  }

  getOne(options: any = {}): Promise<any> {
    return this.mapEntity(this.repository.findOne({ ...this.options, ...options }));
  }

  async updateById(id: number, partial: any, byUser: UserEntity): Promise<any> {
    await this.repository.update({ id }, {
      ...this.serializeDtoForBareUpdate(partial),
      ...(byUser ? { updatedByUserId: byUser.id } : {})
    });
    const updated = await this.getOne({ where: { id }, ...this.options });
    await this.updateRelationsOnUpdate(updated, { id, ...partial });
    return this.getOne({ where: { id }, ...this.options });
  }

  updateRelationsOnCreate(created, dto) {
    return created;
  }

  updateRelationsOnUpdate(updated, dto) {
    return updated;
  }

  serializeDtoForBareUpdate(updateDto) {
    return updateDto;
  }

  serializeDtoForBareCreate(createDto) {
    return createDto;
  }

  mapEntity(entity) {
    return entity;
  }
}

export interface CrudInterface {
  updateRelationsOnCreate(created: any, dto: any): Promise<any>;
  updateRelationsOnUpdate(updated: any, dto: any): Promise<any>;
  updateRelations(updated: any, dto: any): Promise<any>;
  serializeDtoForBareCreate;
  serializeDtoForBareUpdate;
}
