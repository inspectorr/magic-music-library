import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController } from '@/support/controller/crud.controller';
import { SongService } from '@/music/songs/song.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { CreateSongDto } from '@/music/songs/dto/create-song.dto';
import { UpdateSongDto } from '@/music/songs/dto/update-song.dto';

@ApiBearerAuth()
@ApiTags('Songs')
@Controller('music/songs')
@UseGuards(JwtAuthGuard)
export class SongController extends CrudController {
    constructor(readonly service: SongService) {
        super(service);
    }

    @Post()
    @ApiOperation({ summary: 'Create new song.' })
    create(@Body() { name, releasedAt, genres, artist }: CreateSongDto, @Request() req) {
        return super.create({ name, releasedAt, genres, artist }, req);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update song.' })
    update(@Body() { name, releasedAt, genres, artist }: UpdateSongDto, @Param('id') id: string, @Request() req) {
        return super.update({ name, releasedAt, genres, artist }, id, req);
    }
}
