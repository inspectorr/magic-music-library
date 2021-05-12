import { CrudService } from '@/support/service/crud.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SongEntity } from '@/music/songs/song.entity';
import { CreateSongDto } from '@/music/songs/dto/create-song.dto';
import { UserEntity } from '@/users/model/user.entity';
import { GenreService } from '@/music/genres/genre.service';
import { UpdateSongDto } from '@/music/songs/dto/update-song.dto';
import { ArtistService } from '@/music/artists/artist.service';

@Injectable()
export class SongService extends CrudService {
    @Inject('SONG_REPOSITORY') repository: Repository<SongEntity>;

    constructor(
        readonly genreService: GenreService,
        readonly artistService: ArtistService,
    ) {
        super({ relations: ['genres', 'artist'] });
    }

    async create(dto: CreateSongDto, byUser: UserEntity): Promise<SongEntity> {
        const { genres, artist, ...song } = dto;
        const createdSong = await super.create(song, byUser);

        await this.genreService.update({ genres: genres, updateForSongId: createdSong.id });

        createdSong.artist = await this.artistService.getOne({ where: { id: artist } });
        await this.connect().manager.save(createdSong);

        return super.getOne({ where: { id: createdSong.id } });
    }

    async updateById(id: number, dto: UpdateSongDto, byUser: UserEntity): Promise<SongEntity> {
        const { genres, artist, ...song } = dto;
        let updatedSong = await super.updateById(id, song, byUser);

        await this.genreService.update({ genres: genres, updateForSongId: id});

        updatedSong.artist = artist;
        await this.connect().manager.save(updatedSong);
        return super.getOne({ where: { id } });
    }
}
