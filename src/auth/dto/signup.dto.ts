import {IsEmail, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignupDto {
  @ApiProperty({type: String, description: 'User email address (must be unique)'})
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String})
  password: string;
  @ApiProperty({type: String})
  @IsString()
  name: string;
}

export class AuthTokenDto {
  @ApiProperty({
    type: String,
    description: 'User auth token',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDI5NzdhYS00MjZlLTRiMDAtOWQyZi1kYWFlOGJlODQ3MmQiLCJwcm9maWxlIjoiY2Q5NGFjNDEtNTAxNS00ZjdkLTlmNjItNjNhNWIwY2QxZTI5IiwiaWF0IjoxNzM0MTE5Mzk3fQ.DlrWNiclooQe-GZOWyI7Q09ozpW7zTanbiim4k0FLCA"
  })
  @IsUUID()
  access_token: string;
}
