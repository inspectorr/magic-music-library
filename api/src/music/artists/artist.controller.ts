import { CrudController } from '@/support/controller/crud.controller';
import { Body, Controller, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { ArtistService } from '@/music/artists/artist.service';
import { ArtistEntity } from '@/music/artists/artist.entity';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { CreateArtistDto } from '@/music/artists/dto/create-artist.dto';
import { UpdateArtistDto } from '@/music/artists/dto/update-artist.dto';
import { Roles } from '@/auth/roles/roles.decorator';

@ApiBearerAuth()
@Controller('music/artists')
@ApiTags('Artists')
@Roles('admin')
@UseGuards(JwtAuthGuard)
export class ArtistController extends CrudController {
    @Inject('ARTIST_REPOSITORY') repository: Repository<ArtistEntity>;
    options = { relations: ['genres'] };

    constructor(readonly service: ArtistService) {
        super(service);
    }

    @Post()
    @ApiOperation({ summary: 'Create new artist.' })
    create(@Body() { name, birthDate, genres }: CreateArtistDto, @Request() req) {
        return super.create({ name, birthDate, genres }, req);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update artist.' })
    update(@Body() { name, birthDate, genres }: UpdateArtistDto, @Param('id') id: string, @Request() req) {
        return super.update({ name, birthDate, genres }, id, req);
    }
}
