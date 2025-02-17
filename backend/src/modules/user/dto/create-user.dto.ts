import { ApiProperty } from "@nestjs/swagger";
import { UserFieldDescription, UserValidateMessage, UserValidateValue } from "../user.constant";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty(UserFieldDescription.Name)
  @Length(UserValidateValue.Name.MinLength, UserValidateValue.Name.MaxLength, { message: UserValidateMessage.Name })
  public name: string;

  @ApiProperty(UserFieldDescription.Email)
  @IsEmail({}, { message: UserValidateMessage.Email })
  public email: string;

  @ApiProperty(UserFieldDescription.Password)
  @Length(UserValidateValue.Password.MinLength, UserValidateValue.Password.MaxLength, { message: UserValidateMessage.Password })
  public password: string;
}
