"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "@/services/AuthService";
import { ApiError, Result, User } from "@/utils/type";
import {
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from "@/services/AuthService.type";

export enum AuthState {
  Logged,
  NotLogged,
  Loading,
}

export type UserContextType = {
  state: AuthState;
  user: User | undefined;
  access_token: string;

  onLogin: (
    email: string,
    password: string,
    callback: (res: Result<LoginResponse, ApiError>) => void
  ) => void;
  onRegister: (
    body: RegisterBody,
    callback: (res: Result<RegisterResponse, ApiError>) => void
  ) => void;
  onLogout: (callback: () => void) => void;
  updateUser: (user: User) => void;
};

export const UserContext = React.createContext<UserContextType>({
  state: AuthState.Loading,
  user: undefined,
  access_token: "",
  onLogin: () => null,
  onRegister: () => null,
  onLogout: () => null,
  updateUser: () => null,
});

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const { watch, setValue, getValues } = useForm<
    Omit<UserContextType, "onLogin" | "onRegister" | "onLogout">
  >({ defaultValues: { state: AuthState.Loading, user: undefined } });

  useEffect(() => {
    const state = localStorage.getItem("state");
    const user = localStorage.getItem("user");
    const access_token = localStorage.getItem("access_token");
    if (
      state &&
      user &&
      user !== "undefined" &&
      access_token &&
      access_token !== ""
    ) {
      const stateParse = JSON.parse(state);
      const userParse = JSON.parse(user);
      const access_tokenParse = JSON.parse(access_token);

      setValue("state", stateParse);
      setValue("user", userParse);
      setValue("access_token", access_tokenParse);
    } else {
      setValue("state", AuthState.NotLogged);
      setValue("user", undefined);
      setValue("access_token", "");
    }
  }, []);
  const setResult = (
    result: Result<RegisterResponse, ApiError<any>>,
    callback: any
  ) => {
    if (result.ok) {
      callback(result);
      setValue("state", AuthState.Logged);
      setValue("user", result.ok.body.user);
      setValue("access_token", result.ok.body.access_token);
    } else {
      setValue("state", AuthState.NotLogged);
      setValue("user", undefined);
      setValue("access_token", "");
    }
    localStorage.setItem("state", JSON.stringify(getValues("state")));
    localStorage.setItem("user", JSON.stringify(getValues("user")));
    localStorage.setItem(
      "access_token",
      JSON.stringify(getValues("access_token"))
    );
  };

  const onLogin = useCallback(
    (
      email: string,
      password: string,
      callback: (res: Result<LoginResponse, ApiError>) => void
    ) => {
      AuthService.login({ email, password }, (result) => {
        setResult(result, callback);
      });
    },
    []
  );

  const onRegister = useCallback(
    (
      body: RegisterBody,
      callback: (res: Result<RegisterResponse, ApiError>) => void
    ) => {
      AuthService.register(body, (result) => {
        setResult(result, callback);
      });
    },
    []
  );

  const onLogout = useCallback((callback: () => void) => {
    callback();
    setValue("state", AuthState.NotLogged);
    setValue("user", undefined);
    setValue("access_token", "");
    localStorage.setItem("state", JSON.stringify(getValues("state")));
    localStorage.setItem("user", JSON.stringify(getValues("user")));
    localStorage.setItem(
      "access_token",
      JSON.stringify(getValues("access_token"))
    );
  }, []);

  const updateUser = useCallback((user: User) => {
    setValue("user", user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  return (
    <UserContext.Provider
      value={{ ...watch(), onLogin, onRegister, onLogout, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
