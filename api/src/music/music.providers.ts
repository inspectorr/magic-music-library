import { SongEntity } from '@/music/songs/song.entity';
import { Connection } from 'typeorm';
import { GenreEntity } from '@/music/genres/genre.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { AlbumEntity } from '@/music/albums/album.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { SongService } from '@/music/songs/song.service';
import { GenreService } from '@/music/genres/genre.service';
import { ArtistService } from '@/music/artists/artist.service';

export const musicEntities = [
    SongEntity,
    GenreEntity,
    ArtistEntity,
    AlbumEntity,
    BandEntity,
];

export const musicServices = [
    SongService,
    GenreService,
    ArtistService
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
];

// todo find way to work it
// export const musicProviders = Object.entries(musicEntities)
//     .map(([ENTITY_NAME, Type]) => {
//         return DatabaseRepository(`${ENTITY_NAME}_REPOSITORY`, Type);
//     });

// export const musicEntitiesList = Object.values(musicEntities);
