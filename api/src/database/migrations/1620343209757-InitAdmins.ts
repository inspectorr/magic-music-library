import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@/users/model/user.entity';

export class InitAdmins1620343209757 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!process.env.ROOT_ADMIN_PASSWORD) {
            throw new Error('Specify root admin password to run this migration.');
        }
        if (!process.env.ROOT_ADMIN_EMAIL) {
            throw new Error('Specify root admin email to run this migration.');
        }

        await queryRunner.query(`
        INSERT INTO "users" 
        (
            "email",
            "role",
            "name", 
            "password"
        ) VALUES (
            '${process.env.ROOT_ADMIN_EMAIL}', 
            'admin', 
            'Root', 
            '${await UserEntity.hashPassword(process.env.ROOT_ADMIN_PASSWORD)}'
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users" WHERE email = '${process.env.ROOT_ADMIN_EMAIL}'`);
    }
}
