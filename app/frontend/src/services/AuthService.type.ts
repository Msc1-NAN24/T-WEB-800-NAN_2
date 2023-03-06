import {IsEmail, Length} from "class-validator";

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
  accessToken: string;
  user: unknown;
}

export type LoginError = {

}

export class RegisterBody {
  @IsEmail()
  email: string;

  @Length(8, 32)
  password: string;

  @Length(3, 32)
  firstname: string;

  @Length(3, 32)
  lastname: string;


  constructor(email: string, password: string, firstname: string, lastname: string) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

export type RegisterResponse = {

}