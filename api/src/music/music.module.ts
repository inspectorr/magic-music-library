import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from '@/database/database.module';
import { musicProviders, musicServices } from '@/music/music.providers';
import { SongController } from '@/music/songs/song.controller';
import { GenreController } from '@/music/genres/genre.controller';
import { ArtistController } from '@/music/artists/artist.controller';
import { BandController } from '@/music/bands/band.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GenreController,
    SongController,
    ArtistController,
    BandController
  ],
  providers: [...musicProviders, ...musicServices],
  exports: [...musicServices],
})
export class MusicModule {}
