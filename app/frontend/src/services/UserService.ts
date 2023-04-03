import { UserUpdate } from "@/services/UserService.type";
import { API } from "@/utils/api";
import { ApiError, Result, User } from "@/utils/type";

export class UserService {
  public static update(
    userId: string,
    body: UserUpdate,
    callback: (result: Result<User, ApiError>) => void,
    options: RequestInit = {}
  ) {
    API.patch<User, ApiError>(`/user/${userId}`, body, options, (result) =>
      callback(result)
    );
  }

  static setPicture(
    userId: string,
    picture: string | undefined,
    callback: (result: Result<User, ApiError>) => void,
    options: RequestInit = {}
  ) {
    API.patch<User, ApiError>(
      `/user/${userId}`,
      { picture },
      options,
      (result) => callback(result)
    );
  }
}
