import {MigrationInterface, QueryRunner} from "typeorm";

export class bump1620450384189 implements MigrationInterface {
    name = 'bump1620450384189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "releasedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "releasedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "UQ_f105f8230a83b86a346427de94d"`);
    }

}
