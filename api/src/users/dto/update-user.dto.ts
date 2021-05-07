import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly role: 'admin' | 'user';
}
