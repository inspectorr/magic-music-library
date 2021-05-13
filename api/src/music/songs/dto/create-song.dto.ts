import { BaseDto } from '@/support/model/base.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    releasedAt: Date;

    @ApiProperty()
    albumOrder?: number;

    @ApiProperty()
    genres?: number[];

    @ApiProperty()
    artist?: number;
}
