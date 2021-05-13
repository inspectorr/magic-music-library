import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableFoundedAtBandColumn1620946735812 implements MigrationInterface {
    name = 'nullableFoundedAtBandColumn1620946735812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bands" ALTER COLUMN "foundedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bands" ALTER COLUMN "foundedAt" SET NOT NULL`);
    }

}
