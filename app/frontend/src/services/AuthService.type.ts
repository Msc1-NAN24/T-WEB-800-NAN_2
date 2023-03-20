import { IsEmail, Length } from "class-validator";
import { User } from "@/utils/type";

export class LoginBody {
  @IsEmail()
  email: string;

  @Length(8, 32)
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export type LoginResponse = {
  access_token: string;
  user: User;
};

export type LoginError = {};

export class RegisterBody {
  @IsEmail()
  email: string;

  @Length(8, 32)
  password: string;

  @Length(3, 32)
  firstName: string;

  @Length(3, 32)
  lastName: string;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
  }
}

export type RegisterResponse = {
  access_token: string;
  user: User;
};
