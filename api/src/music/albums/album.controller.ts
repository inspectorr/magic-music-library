import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController } from '@/support/controller/crud.controller';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { AlbumService } from '@/music/albums/album.service';
import { CreateAlbumDto } from '@/music/albums/dto/create-album.dto';
import { UpdateAlbumDto } from '@/music/albums/dto/update-album.dto';

@ApiBearerAuth()
@ApiTags('Albums')
@Controller('music/albums')
@UseGuards(JwtAuthGuard)
export class AlbumController extends CrudController {
    constructor(readonly service: AlbumService) {
        super(service);
    }

    @Post()
    @ApiOperation({ summary: 'Create new album.' })
    create(@Body() { name, releasedAt, genres, artist, band }: CreateAlbumDto, @Request() req) {
        return super.create({ name, releasedAt, genres, artist, band }, req);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update album.' })
    update(@Body() { name, releasedAt, genres, artist, band }: UpdateAlbumDto, @Param('id') id: string, @Request() req) {
        return super.update({ name, releasedAt, genres, artist, band }, id, req);
    }
}
