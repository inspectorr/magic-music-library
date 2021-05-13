import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { GenreService } from '@/music/genres/genre.service';

@Injectable()
export class ArtistService extends CrudService {
    @Inject('ARTIST_REPOSITORY') repository: Repository<ArtistEntity>;
    options = { relations: ['genres'] };

    constructor(readonly genreService: GenreService) {
        super();
    }

    serializeDtoForBareUpdate = ({ genres, ...dto }) => dto;
    serializeDtoForBareCreate = ({ genres, ...dto }) => dto;

    async updateRelations(artist, dto) {
        await this.genreService.update({ genres: dto.genres, updateForArtistId: artist.id });
    }

    updateRelationsOnUpdate = this.updateRelations;
    updateRelationsOnCreate = this.updateRelations;
}
