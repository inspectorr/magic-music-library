import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@/support/model/base.dto';

export class UpdateSongDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    releasedAt: Date;

    @IsNumber()
    @ApiProperty()
    albumOrder: number;

    @ApiProperty()
    genres?: number[];

    @ApiProperty()
    artist?: number;

    @ApiProperty()
    band?: number;
}
