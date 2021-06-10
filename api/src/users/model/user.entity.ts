import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import * as bcrypt from 'bcrypt';
import { GenreEntity } from '@/music/genres/genre.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: 'root' | 'admin' | 'user';

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToMany(() => GenreEntity, genre => genre.users)
  genres: GenreEntity[];

  static SALT_ROUNDS = 10;

  static async hashPassword(plainPassword: string) {
    return await bcrypt.hash(plainPassword, UserEntity.SALT_ROUNDS);
  }

  async comparePassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
