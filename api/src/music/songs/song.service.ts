import { CrudInterface, CrudService } from '@/support/service/crud.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SongEntity } from '@/music/songs/song.entity';
import { GenreService } from '@/music/genres/genre.service';
import { ArtistService } from '@/music/artists/artist.service';

@Injectable()
export class SongService extends CrudService implements CrudInterface {
    @Inject('SONG_REPOSITORY') repository: Repository<SongEntity>;
    options = { relations: ['genres', 'artist'] };

    constructor(
        readonly genreService: GenreService,
        readonly artistService: ArtistService,
    ) {
        super();
    }

    serializeDtoForBareUpdate = ({ artist, genres, ...dto }) => dto;
    serializeDtoForBareCreate = ({ artist, genres, ...dto }) => dto;

    async updateRelations(song, dto) {
        song.artist = dto.artist;
        await this.connect().manager.save(song);

        await this.genreService.update({ genres: dto.genres, updateForSongId: song.id });
    }

    updateRelationsOnUpdate = this.updateRelations;
    updateRelationsOnCreate = this.updateRelations;
}
