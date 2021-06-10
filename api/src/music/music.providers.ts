import { Connection } from 'typeorm';
import { SongEntity } from '@/music/songs/song.entity';
import { GenreEntity } from '@/music/genres/genre.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { AlbumEntity } from '@/music/albums/album.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { SongService } from '@/music/songs/song.service';
import { GenreService } from '@/music/genres/genre.service';
import { ArtistService } from '@/music/artists/artist.service';
import { BandService } from '@/music/bands/band.service';
import { AlbumService } from '@/music/albums/album.service';
import { UserEntity } from '@/users/model/user.entity';

export const musicEntities = [
    SongEntity,
    GenreEntity,
    ArtistEntity,
    BandEntity,
    AlbumEntity,
];

export const musicServices = [
    SongService,
    GenreService,
    ArtistService,
    BandService,
    AlbumService
];

export const musicProviders = [
    {
        provide: 'SONG_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(SongEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'GENRE_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(GenreEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ARTIST_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(ArtistEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'BAND_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(BandEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ALBUM_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(AlbumEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(UserEntity),
        inject: ['DATABASE_CONNECTION'],
    },
];

// todo find way to work it
// export const musicProviders = Object.entries(musicEntities)
//     .map(([ENTITY_NAME, Type]) => {
//         return DatabaseRepository(`${ENTITY_NAME}_REPOSITORY`, Type);
//     });

// export const musicEntitiesList = Object.values(musicEntities);
