import { Module } from '@nestjs/common/decorators';
import { DatabaseModule } from '@/database/database.module';
import { musicProviders, musicServices } from '@/music/music.providers';
import { SongController } from '@/music/songs/song.controller';
import { GenreController } from '@/music/genres/genre.controller';
import { ArtistController } from '@/music/artists/artist.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GenreController,
    SongController,
    ArtistController
  ],
  providers: [...musicProviders, ...musicServices],
  exports: [...musicServices],
})
export class MusicModule {}
