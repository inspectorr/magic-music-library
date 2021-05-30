import { Column, Entity, Generated, ManyToMany, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { GenreEntity } from '@/music/genres/genre.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { AlbumEntity } from '@/music/albums/album.entity';
import { BaseEntity } from '@/support/model/base.entity';

@Entity('songs')
export class SongEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    releasedAt: Date;

    @ManyToMany(() => GenreEntity, genre => genre.songs)
    genres: GenreEntity[];

    @ManyToOne(() => ArtistEntity, artist => artist.songs)
    artist: ArtistEntity;

    @ManyToOne(() => BandEntity, band => band.songs)
    band: BandEntity;

    @ManyToOne(() => AlbumEntity, album => album.songs)
    album: AlbumEntity;

    @Column({ nullable: true })
    @Generated('increment')
    albumOrder: number;

    constructor(partial: Partial<SongEntity>) {
        super();
        Object.assign(this, partial);
    }

    @Expose()
    get artistOrBand() {
        return this.artist || this.band;
    }
}
