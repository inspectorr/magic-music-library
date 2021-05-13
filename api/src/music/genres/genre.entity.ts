import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '@/support/model/base.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { UserEntity } from '@/users/model/user.entity';
import { SongEntity } from '@/music/songs/song.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { AlbumEntity } from '@/music/albums/album.entity';

@Entity('genres')
export class GenreEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];

    @ManyToMany(() => ArtistEntity, artist => artist.genres)
    @JoinTable()
    artists: ArtistEntity[];

    @ManyToMany(() => SongEntity, song => song.genres)
    @JoinTable()
    songs: SongEntity[];

    @ManyToMany(() => BandEntity, band => band.genres)
    @JoinTable()
    bands: BandEntity[];

    @ManyToMany(() => AlbumEntity)
    @JoinTable()
    albums: AlbumEntity[];
}
