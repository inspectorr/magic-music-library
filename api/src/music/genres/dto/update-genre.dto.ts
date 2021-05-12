import { BaseDto } from '@/support/model/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGenreDto extends BaseDto {
    @ApiProperty()
    genres: number[];

    @ApiProperty()
    updateForSongId?: number;

    @ApiProperty()
    updateForUserId?: number;

    @ApiProperty()
    updateForArtistId?: number;
}
