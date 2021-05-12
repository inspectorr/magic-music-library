import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { GenreEntity } from '@/music/genres/genre.entity';
import { SongEntity } from '@/music/songs/song.entity';
import { AlbumEntity } from '@/music/albums/album.entity';
import { BandEntity } from '@/music/bands/band.entity';

@Entity('artists')
export class ArtistEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    birthDate: Date;

    @ManyToMany(() => GenreEntity, genre => genre.artists)
    genres: GenreEntity[];

    @OneToMany(() => SongEntity, song => song.artist)
    songs: SongEntity[];

    @OneToMany(() => AlbumEntity, album => album.artist)
    albums: AlbumEntity[];

    @ManyToMany(() => BandEntity)
    bands: BandEntity[];
}
