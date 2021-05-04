import { BaseDto } from '@/support/model/base.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminDto extends BaseDto {
    @IsString()
    @ApiProperty()
    readonly email: string;
}
