import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserAuditColumns1620943227254 implements MigrationInterface {
    name = 'addUserAuditColumns1620943227254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "bands" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "bands" ADD "updatedByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "updatedByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "updatedByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "updatedByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "updatedByUserId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "createdByUserId"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "createdByUserId"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "createdByUserId"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "createdByUserId"`);
        await queryRunner.query(`ALTER TABLE "bands" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "bands" DROP COLUMN "createdByUserId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedByUserId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdByUserId"`);
    }

}
