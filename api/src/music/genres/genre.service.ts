import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { GenreEntity } from '@/music/genres/genre.entity';
import { UpdateGenreDto } from '@/music/genres/dto/update-genre.dto';
import { SongEntity } from '@/music/songs/song.entity';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { BandEntity } from '@/music/bands/band.entity';

@Injectable()
export class GenreService extends CrudService {
    @Inject('GENRE_REPOSITORY') readonly repository: Repository<GenreEntity>;
    @Inject('SONG_REPOSITORY') readonly songRepository: Repository<SongEntity>;
    @Inject('ARTIST_REPOSITORY') readonly artistRepository: Repository<ArtistEntity>;
    @Inject('BAND_REPOSITORY') readonly bandRepository: Repository<BandEntity>;

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
        const song = await repository.findOne(entityId);
        song.genres = [];
        await repository.save(song);
        await this.append(name, genres, entityId);
    }

    async update({
        genres = [],
        updateForSongId,
        updateForArtistId,
        updateForBandId
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
    }
}
