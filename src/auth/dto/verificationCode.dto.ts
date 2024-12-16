import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, MinLength} from "class-validator";


export class SendCodeRequestBodyDto {
  @ApiProperty({
    type: String,
    example: "+380679988555",
    description: "Valid phone number that starts with the international calling code (e. g. +41)"
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
}

export class VerifyCodeRequestBodyDto {
  @ApiProperty({
    type: String,
    example: "+380679988555",
    description: "Valid phone number that starts with the international calling code (e. g. +41)"
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
  @ApiProperty({
    type: String,
    example: "1234",
    description: "Valid 4-digit code that was retrieved using the 'send-code' method"
  })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(4)
  code: string;
}

export class ValidationCodeDto {
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  message: string;
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  code?: string
}
