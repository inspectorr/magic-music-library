import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CrudController } from '@/support/controller/crud.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/auth/roles/roles.decorator';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { UpdateBandDto } from './dto/update-band.dto';
import { CreateBandDto } from './dto/create-band.dto';
import { BandService } from '@/music/bands/band.service';

@Controller('music/bands')
@ApiTags('Bands')
@Roles('admin')
@UseGuards(JwtAuthGuard)
export class BandController extends CrudController {
    constructor(readonly service: BandService) {
        super(service);
    }

    @Post()
    @ApiOperation({ summary: 'Create new band.' })
    create(@Body() { name, foundedAt, genres }: CreateBandDto, @Request() req) {
        return super.create({ name, foundedAt, genres }, req);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update band.' })
    update(@Body() { name, foundedAt, genres }: UpdateBandDto, @Param('id') id: string, @Request() req) {
        return super.update({ name, foundedAt, genres }, id, req);
    }
}
