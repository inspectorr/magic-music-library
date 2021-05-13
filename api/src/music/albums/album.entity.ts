import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { GenreEntity } from '@/music/genres/genre.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { SongEntity } from '@/music/songs/song.entity';

@Entity('albums')
export class AlbumEntity extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => GenreEntity)
    genres: GenreEntity[];

    @Column()
    releasedAt: Date;

    @ManyToOne(() => ArtistEntity, artist => artist.albums)
    artist: ArtistEntity;

    @ManyToOne(() => BandEntity, band => band.albums)
    band: BandEntity;

    @OneToMany(() => SongEntity, song => song.album)
    songs: SongEntity[];
}
