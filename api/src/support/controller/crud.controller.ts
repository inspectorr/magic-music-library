import { Body, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CrudService } from '@/support/service/crud.service';
import { BaseDto } from '@/support/model/base.dto';
import { ApiOperation } from '@nestjs/swagger';

export class CrudController {
  constructor(
      readonly service: CrudService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all entities.' })
  getAll() {
    return this.service.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new entity.' })
  create(@Body() dto: BaseDto, @Request() req) {
    return this.service.create(dto, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing entity.' })
  update(@Body() dto: BaseDto, @Param('id') id: string, @Request() req) {
    return this.service.updateById(Number(id), dto, req.user);
  }
}
