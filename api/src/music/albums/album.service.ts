import { CrudService } from '@/support/service/crud.service';
import { Inject, Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { AlbumEntity } from '@/music/albums/album.entity';
import { GenreService } from '@/music/genres/genre.service';
import { SongEntity } from '@/music/songs/song.entity';

@Injectable()
export class AlbumService extends CrudService {
    @Inject('ALBUM_REPOSITORY') repository: Repository<AlbumEntity>;
    @Inject('SONG_REPOSITORY') songRepository: Repository<SongEntity>;
    options = { relations: ['genres', 'artist', 'band', 'songs'] };

    constructor(readonly genreService: GenreService) {
        super();
    }

    serializeDtoForBareUpdate = ({ artist, band, genres, ...dto }) => dto;
    serializeDtoForBareCreate = ({ artist, band, genres, ...dto }) => dto;
    mapEntity = (entity) => {
        if (entity.songs) {
            entity.songs.sort((a, b) => a.albumOrder - b.albumOrder);
        }

        return entity;
    }

    async updateRelations(album, dto) {
        album.artist = dto.artist;
        album.band = dto.band;
        await this.connect().manager.save(album);

        await this.genreService.update({ genres: dto.genres, updateForAlbumId: album.id });
    }

    updateRelationsOnUpdate = this.updateRelations;
    updateRelationsOnCreate = this.updateRelations;

    async addSong(albumId, songId) {
        const album = await this.repository.findOne({ where: { id: albumId } });
        const song = await this.songRepository.findOne({ where: { id: songId }, relations: ['album'] });

        if (song.album && Number(song.album.id) === Number(albumId)) { // toggle
            song.album = null;
            song.albumOrder = null;
        } else { // add
            song.album = albumId;
            song.albumOrder = album.songs?.length ?? 0;
        }

        await this.connect().manager.save(song);
    }

    async reorderSongs(albumId: number, songIds: number[]) {
        const songs = await this.songRepository.find({ where: { id: In(songIds), album: albumId } });

        const songIdIndexMap = songIds.reduce((acc, songId, i) => ({ [songId]: i, ...acc }), {});
        songs.sort((a, b) => songIdIndexMap[a.id] - songIdIndexMap[b.id]);

        return Promise.all(songs.map((song, index) => {
            song.albumOrder = index;
            return this.connect().manager.save(song);
        }));
    }

    async getSongs(albumId: number) {
        const songs = await this.songRepository.find({ where: { album: albumId }, relations: ['album'] })
        songs.sort((a, b) => a.albumOrder - b.albumOrder);
        return songs;
    }
}
