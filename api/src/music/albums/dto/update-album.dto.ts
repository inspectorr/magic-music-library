import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@/support/model/base.dto';

export class UpdateAlbumDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    releasedAt: Date;

    @ApiProperty()
    genres?: number[];

    @ApiProperty()
    artist?: number;

    @ApiProperty()
    band?: number;
}
