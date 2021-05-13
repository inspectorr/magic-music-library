import { BaseDto } from '@/support/model/base.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty()
    genres?: number[];
}
