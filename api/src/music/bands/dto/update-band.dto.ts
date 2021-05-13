import { BaseDto } from '@/support/model/base.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBandDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    foundedAt: Date;

    @ApiProperty()
    genres?: number[];
}
