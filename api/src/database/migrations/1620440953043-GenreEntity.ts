import {MigrationInterface, QueryRunner} from "typeorm";

export class GenreEntity1620440953043 implements MigrationInterface {
    name = 'GenreEntity1620440953043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "albumOrder" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "albumOrder" SET NOT NULL`);
    }

}
