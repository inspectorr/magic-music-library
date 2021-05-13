import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { GenreEntity } from '@/music/genres/genre.entity';
import { UpdateGenreDto } from '@/music/genres/dto/update-genre.dto';
import { SongEntity } from '@/music/songs/song.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';

@Injectable()
export class GenreService extends CrudService {
    @Inject('GENRE_REPOSITORY') readonly repository: Repository<GenreEntity>;
    @Inject('SONG_REPOSITORY') readonly songRepository: Repository<SongEntity>;
    @Inject('ARTIST_REPOSITORY') readonly artistRepository: Repository<ArtistEntity>;

    getOneByName(name) {
        return this.repository.findOne({ where: { name } });
    }

    async append(property: string, genreIds: any[], add: any) {
        genreIds = genreIds || [];
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

    async update({
        genres,
        updateForSongId,
        updateForArtistId
    }: UpdateGenreDto) {
        if (updateForSongId) {
            const song = await this.songRepository.findOne(updateForSongId);
            song.genres = [];
            await this.songRepository.save(song);
            await this.append('songs', genres, updateForSongId);
        } else if (updateForArtistId) {
            const artist = await this.artistRepository.findOne(updateForArtistId);
            artist.genres = [];
            await this.artistRepository.save(artist);
            await this.append('artists', genres, updateForArtistId)
        }
    }
}
