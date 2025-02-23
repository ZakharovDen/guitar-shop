import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, IsString } from "class-validator";
import { UserFieldDescription, UserValidateMessage, UserValidateValue } from "../user.constant";

export class LoginUserDto {
  @ApiProperty(UserFieldDescription.Email)
  @IsEmail({}, { message: UserValidateMessage.Email })
  public email: string;

  @ApiProperty(UserFieldDescription.Password)
  @IsString()
  public password: string;
}