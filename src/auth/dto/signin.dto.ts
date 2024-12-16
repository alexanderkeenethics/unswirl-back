import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SigninDto {
  @ApiProperty({type: String, description: 'User email address'})
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  password: string;
}
