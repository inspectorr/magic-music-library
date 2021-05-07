import {MigrationInterface, QueryRunner} from "typeorm";
import overrideEnv from '@/support/utils/override.env';
overrideEnv();

export class UpgradeInitToRoot1620350047058 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
            UPDATE users SET role = 'root' WHERE email = '${process.env.ROOT_ADMIN_EMAIL}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
            UPDATE users SET role = 'admin' WHERE role = 'root'
        `);
    }
}
