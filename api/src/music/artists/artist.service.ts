import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { UserEntity } from '@/users/model/user.entity';
import { GenreService } from '@/music/genres/genre.service';
import { CreateArtistDto } from '@/music/artists/dto/create-artist.dto';
import { UpdateArtistDto } from '@/music/artists/dto/update-artist.dto';

@Injectable()
export class ArtistService extends CrudService {
    @Inject('ARTIST_REPOSITORY') repository: Repository<ArtistEntity>;
    options = { relations: ['genres'] };

    constructor(readonly genreService: GenreService) {
        super();
    }

    async create(dto: CreateArtistDto, byUser: UserEntity): Promise<ArtistEntity> {
        const { genres, ...artist } = dto;
        const createdArtist = await super.create(artist, byUser);

        await this.genreService.append('artists', genres, createdArtist.id)

        return super.getOne({ where: { id: createdArtist.id } });
    }

    async updateById(id: number, dto: UpdateArtistDto, byUser: UserEntity): Promise<ArtistEntity> {
        const { genres, ...artist } = dto;
        const updatedArtist = await super.updateById(id, artist, byUser);

        await this.genreService.update({ genres: genres, updateForArtistId: id});

        return super.getOne({ where: { id: updatedArtist.id } });
    }

}
