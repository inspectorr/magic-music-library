import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '@/users/model/user.entity';
import { UniqueOnTable } from '@/support/decorators/UniqueValidation';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsEmail()
  @UniqueOnTable(UserEntity)
  @ApiProperty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}
