import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController } from '@/support/controller/crud.controller';
import { SongService } from '@/music/songs/song.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { CreateSongDto } from '@/music/songs/dto/create-song.dto';
import { UpdateSongDto } from '@/music/songs/dto/update-song.dto';
import { Roles } from '@/auth/roles/roles.decorator';

@ApiBearerAuth()
@ApiTags('Songs')
@Controller('music/songs')
@UseGuards(JwtAuthGuard)
@Roles('admin')
export class SongController extends CrudController {
    constructor(readonly service: SongService) {
        super(service);
    }

    @Post()
    @ApiOperation({ summary: 'Create new song.' })
    create(@Body() { name, releasedAt, genres, artist, band, album }: CreateSongDto, @Request() req) {
        return super.create({ name, releasedAt, genres, artist, band, album }, req);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update song.' })
    update(@Body() { name, releasedAt, genres, artist, band, album }: UpdateSongDto, @Param('id') id: string, @Request() req) {
        return super.update({ name, releasedAt, genres, artist, band, album }, id, req);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @ApiOperation({ summary: 'Get all songs.' })
    getAll() {
        return super.getAll();
    }
}
