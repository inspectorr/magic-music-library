import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { BandEntity } from '@/music/bands/band.entity';
import { GenreService } from '@/music/genres/genre.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Injectable()
export class BandService extends CrudService {
    @Inject('BAND_REPOSITORY') repository: Repository<BandEntity>;
    options = { relations: ['genres'] };

    constructor(readonly genreService: GenreService) {
        super();
    }

    serializeDtoForBareUpdate = ({ genres, ...dto }) => dto;
    serializeDtoForBareCreate = ({ genres, ...dto }) => dto;

    async updateRelations(band, dto) {
        await this.genreService.update({ genres: dto.genres, updateForBandId: band.id });
    }

    updateRelationsOnUpdate = this.updateRelations;
    updateRelationsOnCreate = this.updateRelations;
}
