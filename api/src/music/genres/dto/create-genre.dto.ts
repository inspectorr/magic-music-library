import { BaseDto } from '@/support/model/base.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueOnTable } from '@/support/decorators/UniqueValidation';
import { GenreEntity } from '@/music/genres/genre.entity';

export class CreateGenreDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ uniqueItems: true })
    @UniqueOnTable(GenreEntity)
    name: string;
}
