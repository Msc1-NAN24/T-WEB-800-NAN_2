import { IsEmail, IsOptional, IsPhoneNumber } from "class-validator";

export class UserUpdate {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsOptional()
  public firstName?: string;

  @IsOptional()
  public lastName?: string;

  @IsPhoneNumber()
  @IsOptional()
  public phone?: string;
  constructor(
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}
