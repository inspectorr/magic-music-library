import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { GenreEntity } from '@/music/genres/genre.entity';
import { UpdateGenreDto } from '@/music/genres/dto/update-genre.dto';
import { SongEntity } from '@/music/songs/song.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { BandEntity } from '@/music/bands/band.entity';
import { AlbumEntity } from '@/music/albums/album.entity';
import { UserEntity } from '@/users/model/user.entity';

@Injectable()
export class GenreService extends CrudService {
    @Inject('GENRE_REPOSITORY') readonly repository: Repository<GenreEntity>;
    @Inject('SONG_REPOSITORY') readonly songRepository: Repository<SongEntity>;
    @Inject('ARTIST_REPOSITORY') readonly artistRepository: Repository<ArtistEntity>;
    @Inject('BAND_REPOSITORY') readonly bandRepository: Repository<BandEntity>;
    @Inject('ALBUM_REPOSITORY') readonly albumRepository: Repository<AlbumEntity>;
    @Inject('USER_REPOSITORY') readonly userRepository: Repository<UserEntity>;

    getOneByName(name) {
        return this.repository.findOne({ where: { name } });
    }

    async append(property: string, genreIds: any[] = [], add: any) {
        try {
            await Promise.all(genreIds.map((id) =>
                this.qb()
                    .relation(GenreEntity, property)
                    .of(id)
                    .add(add)
            ));
        } catch (e) {
            console.error({appendError: e})
        }
    }

    async updateForEntityId(repository: Repository<any>, entityId: number, name: string, genres: any[]) {
        const entity = await repository.findOne(entityId);
        entity.genres = [];
        await repository.save(entity);
        await this.append(name, genres, entityId);
    }

    async update({
        genres = [],
        updateForSongId,
        updateForArtistId,
        updateForBandId,
        updateForAlbumId,
        updateForUserId
    }: UpdateGenreDto) {
        if (updateForSongId) {
            await this.updateForEntityId(this.songRepository, updateForSongId, 'songs', genres);
        }
        if (updateForArtistId) {
            await this.updateForEntityId(this.artistRepository, updateForArtistId, 'artists', genres);
        }
        if (updateForBandId) {
            await this.updateForEntityId(this.bandRepository, updateForBandId, 'bands', genres);
        }
        if (updateForAlbumId) {
            await this.updateForEntityId(this.albumRepository, updateForAlbumId, 'albums', genres);
        }
        if (updateForUserId) {
            await this.updateForEntityId(this.userRepository, updateForUserId, 'users', genres);
        }
    }

    async saveUser(genres, user) {
        return this.update({ genres, updateForUserId: user.id });
    }

    async getRandom(genres) {
        return Object.entries((await Promise.all(genres.map((id) => (
            this.repository.findOne({
                where: { id },
                relations: [
                    'songs',
                    'songs.genres',
                    'songs.artist',
                    'songs.band',
                    'songs.album',
                    'artists',
                    'artists.genres',
                    'artists.albums',
                    'bands',
                    'bands.genres',
                    'bands.albums',
                    'albums',
                    'albums.genres',
                    'albums.songs',
                    'albums.artist',
                    'albums.band',
                ],
            })
        ))))
        .reduce((acc: any, data: any) => ({
            songs: flat(acc.songs, data.songs),
            artists: flat(acc.artists, data.artists),
            bands: flat(acc.bands, data.bands),
            albums: flat(acc.albums, data.albums),
        }), {}))
        .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: filter(value),
        }), {});
    }
}

function flat(...arrays) {
    return arrays.reduce((a, b) => [...(a ?? []), ...(b ?? [])], []);
}

function filter(array) {
    const map = array.reduce((acc, el, i) => ({
        ...acc,
        [el.id]: acc[el.id] ?? i
    }), {});

    return array.filter((el, i) => i === map[el.id]);
}
