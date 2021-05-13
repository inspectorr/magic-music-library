import {MigrationInterface, QueryRunner} from "typeorm";

export class SongEntity1620440818733 implements MigrationInterface {
    name = 'SongEntity1620440818733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bands" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "foundedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_9355783ed6ad7f73a4d6fe50ea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "releasedAt" TIMESTAMP NOT NULL, "artistId" integer, "bandId" integer, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "releasedAt" TIMESTAMP NOT NULL, "albumOrder" SERIAL, "artistId" integer, "bandId" integer, "albumId" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bands_artists_artists" ("bandsId" integer NOT NULL, "artistsId" integer NOT NULL, CONSTRAINT "PK_8352df0f33a47b25afd996d17fd" PRIMARY KEY ("bandsId", "artistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43dde33040c7d27fef83a651d2" ON "bands_artists_artists" ("bandsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6609341cf3c0ebbe4d286c611e" ON "bands_artists_artists" ("artistsId") `);
        await queryRunner.query(`CREATE TABLE "genres_users_users" ("genresId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_eec34202d46f3930d5000b601ff" PRIMARY KEY ("genresId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cc9436d4b53051af926b32a63" ON "genres_users_users" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a524fa51d1e2926ae993bb4d1" ON "genres_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "genres_artists_artists" ("genresId" integer NOT NULL, "artistsId" integer NOT NULL, CONSTRAINT "PK_ac3fd37382a4825384899655ffa" PRIMARY KEY ("genresId", "artistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff79f61e4db8271eba53c0e15f" ON "genres_artists_artists" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f1d2b1ced9d0eaedd29650d5a1" ON "genres_artists_artists" ("artistsId") `);
        await queryRunner.query(`CREATE TABLE "genres_songs_songs" ("genresId" integer NOT NULL, "songsId" integer NOT NULL, CONSTRAINT "PK_1807a0f3d8f8f8edbbb024e41ff" PRIMARY KEY ("genresId", "songsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08f1e223d97659296fbbdd9255" ON "genres_songs_songs" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c0577ab6e0ee74c34f08d442c" ON "genres_songs_songs" ("songsId") `);
        await queryRunner.query(`CREATE TABLE "genres_bands_bands" ("genresId" integer NOT NULL, "bandsId" integer NOT NULL, CONSTRAINT "PK_35e879efa9ff72c380075944cbf" PRIMARY KEY ("genresId", "bandsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_463871dd4f3bd309064d733fd2" ON "genres_bands_bands" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3fe80e69f730b770d748b4625" ON "genres_bands_bands" ("bandsId") `);
        await queryRunner.query(`CREATE TABLE "genres_albums_albums" ("genresId" integer NOT NULL, "albumsId" integer NOT NULL, CONSTRAINT "PK_701b37203c65912b8580237f64a" PRIMARY KEY ("genresId", "albumsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a54b0ad4b9d25826cd254b3b9b" ON "genres_albums_albums" ("genresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1a9e1e2da9bbdd7a876195ca6b" ON "genres_albums_albums" ("albumsId") `);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_e7d0b5caf812eed0da7db5bbf4e" FOREIGN KEY ("bandId") REFERENCES "bands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_909b985984ad0e366bcdb4224d0" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_33df38ac20fa27c777414ed933d" FOREIGN KEY ("bandId") REFERENCES "bands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_3807642f5c436d2492f486567fc" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bands_artists_artists" ADD CONSTRAINT "FK_43dde33040c7d27fef83a651d22" FOREIGN KEY ("bandsId") REFERENCES "bands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bands_artists_artists" ADD CONSTRAINT "FK_6609341cf3c0ebbe4d286c611e5" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" ADD CONSTRAINT "FK_3cc9436d4b53051af926b32a636" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" ADD CONSTRAINT "FK_2a524fa51d1e2926ae993bb4d1b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_artists_artists" ADD CONSTRAINT "FK_ff79f61e4db8271eba53c0e15f1" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_artists_artists" ADD CONSTRAINT "FK_f1d2b1ced9d0eaedd29650d5a10" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_songs_songs" ADD CONSTRAINT "FK_08f1e223d97659296fbbdd9255d" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_songs_songs" ADD CONSTRAINT "FK_2c0577ab6e0ee74c34f08d442c1" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_bands_bands" ADD CONSTRAINT "FK_463871dd4f3bd309064d733fd26" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_bands_bands" ADD CONSTRAINT "FK_c3fe80e69f730b770d748b4625b" FOREIGN KEY ("bandsId") REFERENCES "bands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_albums_albums" ADD CONSTRAINT "FK_a54b0ad4b9d25826cd254b3b9ba" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genres_albums_albums" ADD CONSTRAINT "FK_1a9e1e2da9bbdd7a876195ca6bd" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres_albums_albums" DROP CONSTRAINT "FK_1a9e1e2da9bbdd7a876195ca6bd"`);
        await queryRunner.query(`ALTER TABLE "genres_albums_albums" DROP CONSTRAINT "FK_a54b0ad4b9d25826cd254b3b9ba"`);
        await queryRunner.query(`ALTER TABLE "genres_bands_bands" DROP CONSTRAINT "FK_c3fe80e69f730b770d748b4625b"`);
        await queryRunner.query(`ALTER TABLE "genres_bands_bands" DROP CONSTRAINT "FK_463871dd4f3bd309064d733fd26"`);
        await queryRunner.query(`ALTER TABLE "genres_songs_songs" DROP CONSTRAINT "FK_2c0577ab6e0ee74c34f08d442c1"`);
        await queryRunner.query(`ALTER TABLE "genres_songs_songs" DROP CONSTRAINT "FK_08f1e223d97659296fbbdd9255d"`);
        await queryRunner.query(`ALTER TABLE "genres_artists_artists" DROP CONSTRAINT "FK_f1d2b1ced9d0eaedd29650d5a10"`);
        await queryRunner.query(`ALTER TABLE "genres_artists_artists" DROP CONSTRAINT "FK_ff79f61e4db8271eba53c0e15f1"`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" DROP CONSTRAINT "FK_2a524fa51d1e2926ae993bb4d1b"`);
        await queryRunner.query(`ALTER TABLE "genres_users_users" DROP CONSTRAINT "FK_3cc9436d4b53051af926b32a636"`);
        await queryRunner.query(`ALTER TABLE "bands_artists_artists" DROP CONSTRAINT "FK_6609341cf3c0ebbe4d286c611e5"`);
        await queryRunner.query(`ALTER TABLE "bands_artists_artists" DROP CONSTRAINT "FK_43dde33040c7d27fef83a651d22"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_3807642f5c436d2492f486567fc"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_33df38ac20fa27c777414ed933d"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_909b985984ad0e366bcdb4224d0"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_e7d0b5caf812eed0da7db5bbf4e"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`);
        await queryRunner.query(`DROP INDEX "IDX_1a9e1e2da9bbdd7a876195ca6b"`);
        await queryRunner.query(`DROP INDEX "IDX_a54b0ad4b9d25826cd254b3b9b"`);
        await queryRunner.query(`DROP TABLE "genres_albums_albums"`);
        await queryRunner.query(`DROP INDEX "IDX_c3fe80e69f730b770d748b4625"`);
        await queryRunner.query(`DROP INDEX "IDX_463871dd4f3bd309064d733fd2"`);
        await queryRunner.query(`DROP TABLE "genres_bands_bands"`);
        await queryRunner.query(`DROP INDEX "IDX_2c0577ab6e0ee74c34f08d442c"`);
        await queryRunner.query(`DROP INDEX "IDX_08f1e223d97659296fbbdd9255"`);
        await queryRunner.query(`DROP TABLE "genres_songs_songs"`);
        await queryRunner.query(`DROP INDEX "IDX_f1d2b1ced9d0eaedd29650d5a1"`);
        await queryRunner.query(`DROP INDEX "IDX_ff79f61e4db8271eba53c0e15f"`);
        await queryRunner.query(`DROP TABLE "genres_artists_artists"`);
        await queryRunner.query(`DROP INDEX "IDX_2a524fa51d1e2926ae993bb4d1"`);
        await queryRunner.query(`DROP INDEX "IDX_3cc9436d4b53051af926b32a63"`);
        await queryRunner.query(`DROP TABLE "genres_users_users"`);
        await queryRunner.query(`DROP INDEX "IDX_6609341cf3c0ebbe4d286c611e"`);
        await queryRunner.query(`DROP INDEX "IDX_43dde33040c7d27fef83a651d2"`);
        await queryRunner.query(`DROP TABLE "bands_artists_artists"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "genres"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "bands"`);
    }

}
