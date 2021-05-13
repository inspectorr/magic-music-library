import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { GenreEntity } from '@/music/genres/genre.entity';
import { SongEntity } from '@/music/songs/song.entity';
import { AlbumEntity } from '@/music/albums/album.entity';

@Entity('bands')
export class BandEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    foundedAt: Date;

    @ManyToMany(() => GenreEntity, genre => genre.bands)
    genres: GenreEntity[];

    @OneToMany(() => SongEntity, song => song.band)
    songs: SongEntity[];

    @OneToMany(() => AlbumEntity, album => album.band)
    albums: AlbumEntity[];
}
