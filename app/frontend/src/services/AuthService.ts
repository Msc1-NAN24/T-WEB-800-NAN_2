import {LoginBody, LoginResponse, RegisterBody, RegisterResponse} from "./AuthService.type";
import {API} from "@/utils/api";
import {ApiError, Result} from "@/utils/type";

export class AuthService {

  public static login(body: LoginBody, callback: (result: Result<LoginResponse, ApiError>) => void) {
    API.post<LoginResponse, ApiError>('/auth/login', body, {}, (result) => callback(result));
  }

  public static register(body: RegisterBody, callback: (result: Result<RegisterResponse, ApiError>) => void) {
    API.post<RegisterResponse, ApiError>('/auth/register', body, {}, (result) => callback(result));
  }

}