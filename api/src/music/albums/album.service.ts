import { CrudService } from '@/support/service/crud.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AlbumEntity } from '@/music/albums/album.entity';
import { GenreService } from '@/music/genres/genre.service';

@Injectable()
export class AlbumService extends CrudService {
    @Inject('ALBUM_REPOSITORY') repository: Repository<AlbumEntity>;
    options = { relations: ['genres', 'artist', 'band', 'songs'] };

    constructor(readonly genreService: GenreService) {
        super();
    }

    serializeDtoForBareUpdate = ({ artist, band, genres, ...dto }) => dto;
    serializeDtoForBareCreate = ({ artist, band, genres, ...dto }) => dto;
    mapEntity = (entity) => entity.songs.sort((a, b) => a.albumOrder - b.albumOrder)

    async updateRelations(album, dto) {
        album.artist = dto.artist;
        album.band = dto.band;
        await this.connect().manager.save(album);

        await this.genreService.update({ genres: dto.genres, updateForAlbumId: album.id });
    }

    updateRelationsOnUpdate = this.updateRelations;
    updateRelationsOnCreate = this.updateRelations;
}
