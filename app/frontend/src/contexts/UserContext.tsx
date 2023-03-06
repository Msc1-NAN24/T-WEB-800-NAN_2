'use client';

import React, {useCallback} from "react";
import {useForm} from "react-hook-form";
import {AuthService} from "@/services/AuthService";
import {ApiError, Result, User} from "@/utils/type";
import {LoginResponse, RegisterBody, RegisterResponse} from "@/services/AuthService.type";

export enum AuthState {
  Logged,
  NotLogged,
  Loading,
}

export type UserContextType = {
  state: AuthState;
  user: User | undefined;
  onLogin: (email: string, password: string, callback: (res: Result<LoginResponse, ApiError>) => void) => void;
  onRegister: (body: RegisterBody, callback: (res: Result<RegisterResponse, ApiError>) => void) => void;
  onLogout: (callback: () => void) => void;
}

export const UserContext = React.createContext<UserContextType>({
  state: AuthState.Loading,
  user: undefined,
  onLogin: () => null,
  onRegister: () => null,
  onLogout: () => null,
});

export const UserContextProvider = ({children}: React.PropsWithChildren) => {

  const {watch} = useForm<Omit<UserContextType, 'onLogin' | 'onRegister' | 'onLogout'>>({defaultValues: {state: AuthState.Loading, user: undefined}});

  const onLogin = useCallback((email: string, password: string, callback: (res: Result<LoginResponse, ApiError>) => void) => {
    AuthService.login({email, password}, (result) => {
      if (result.ok) {
        callback(result);
      }
    });
  }, []);

  const onRegister = useCallback((body: RegisterBody, callback: (res: Result<RegisterResponse, ApiError>) => void) => {
    AuthService.register(body, (result) => {
      if (result.ok) {
        callback(result);
      }
    });
  }, []);

  const onLogout = useCallback((callback: () => void) => {
    callback();
  }, []);

  return (
    <UserContext.Provider value={{...watch(), onLogin, onRegister, onLogout}}>
      {children}
    </UserContext.Provider>
  );
};