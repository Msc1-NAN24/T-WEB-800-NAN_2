"use client";

import Modal, { ModalProps } from "@/components/Modals/Modal";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { LoginBody, LoginResponse } from "@/services/AuthService.type";
import { validateOrReject, ValidationError } from "class-validator";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export type LoginModalProps = {
  title?: string;
  onSuccess: (login: LoginResponse) => void;
  switchToRegister?: () => void;
} & ModalProps;

export type Form = {
  email: string;
  password: string;
};

export default function LoginModal(props: LoginModalProps) {
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<Form>({ defaultValues: { email: "", password: "" } });
  const userCtx = useContext(UserContext);

  const onClickLogin = async () => {
    clearErrors();
    const body = new LoginBody(getValues("email"), getValues("password"));
    validateOrReject(body)
      .then(() => {
        userCtx.onLogin(body.email, body.password, (result) => {
          if (result.ok) {
            props.onSuccess(result.ok.body);
            reset();
          }
        });
      })
      .catch((errors) => {
        if (errors === undefined || errors.length <= 0) return;
        errors.forEach((err: ValidationError) => {
          setError(err.property as keyof Form, {
            message: Object.values(err.constraints ?? {}).join(", "),
          });
        });
      });
  };

  return (
    <Modal {...props}>
      <div className={"flex flex-col w-full"}>
        <h1 className={"modal-title text-2xl font-bold"}>
          {props.title ?? "Se connecter"}
        </h1>

        <TextInput
          prefix={"modal-email"}
          label={"Email"}
          onTextChange={(e) => setValue("email", e)}
          value={watch("email")}
          error={errors.email !== undefined}
          errorText={errors.email?.message}
        />
        <TextInput
          type={'password'}
          prefix={"modal-password"}
          label={"Password"}
          onTextChange={(e) => setValue("password", e)}
          value={watch("password")}
          error={errors.password !== undefined}
          errorText={errors.password?.message}
        />

        <button
          className={"mt-8 modal-login-btn btn btn-primary"}
          onClick={onClickLogin}
        >
          Se connecter
        </button>
        <p
          className={"mt-2 text-center modal-register-hint cursor-pointer"}
          onClick={props.switchToRegister}
        >
          Vous n’avez pas de compte ? inscrivez-vous ici
        </p>
      </div>
    </Modal>
  );
}
