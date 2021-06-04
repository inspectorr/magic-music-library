// @ts-ignore
import { CrudController } from '@/support/controller/crud.controller';
import { GenreService } from '@/music/genres/genre.service';
import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/auth/roles/roles.decorator';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { UpdateGenreDto } from '@/music/genres/dto/update-genre.dto';

@ApiBearerAuth()
@Controller('music/genres')
@Roles('admin')
@UseGuards(JwtAuthGuard)
@ApiTags('Genres')
export class GenreController extends CrudController {
    constructor(readonly service: GenreService) {
        super(service);
    }

    @Put('/set')
    @ApiOperation({ summary: 'Update genre relations.' })
    set(@Body() dto: UpdateGenreDto) {
        return this.service.update(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all genres.' })
    @Roles('admin', 'user')
    getAll() {
        return super.getAll();
    }

    @Get('/use/random/:genres')
    @ApiOperation({ summary: 'Get all songs for user\'s query.' })
    @Roles('admin', 'user')
    getRandom(@Param('genres') genres: string) {
        const split = genres.split(',');
        return this.service.getRandom(split);
    }
}
