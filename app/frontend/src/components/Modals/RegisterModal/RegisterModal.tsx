import Modal, { ModalProps } from "@/components/Modals/Modal";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { validateOrReject, ValidationError } from "class-validator";
import { AuthService } from "@/services/AuthService";
import { RegisterBody, RegisterResponse } from "@/services/AuthService.type";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export type RegisterModalProps = {
  onSuccess: (register: RegisterResponse) => void;
  switchToLogin?: () => void;
  title?: string;
} & ModalProps;

export type Form = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function RegisterModal(props: RegisterModalProps) {
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<Form>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });
  const userCtx = useContext(UserContext);
  const onClickRegister = () => {
    const body = new RegisterBody(
      getValues("email"),
      getValues("password"),
      getValues("firstName"),
      getValues("lastName")
    );
    clearErrors();
    validateOrReject(body)
      .then(() => {
        userCtx.onRegister(body, (result) => {
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
          {props.title ?? "S'inscrire"}
        </h1>
        <TextInput
          prefix={"modal-lastname"}
          label={"Nom"}
          onTextChange={(e) => setValue("lastName", e)}
          value={watch("lastName")}
          error={errors.lastName !== undefined}
          errorText={errors.lastName?.message}
        />
        <TextInput
          prefix={"modal-firstname"}
          label={"Prénom"}
          onTextChange={(e) => setValue("firstName", e)}
          value={watch("firstName")}
          error={errors.firstName !== undefined}
          errorText={errors.firstName?.message}
        />
        <TextInput
          prefix={"modal-email"}
          label={"Email"}
          onTextChange={(e) => setValue("email", e)}
          value={watch("email")}
          error={errors.email !== undefined}
          errorText={errors.email?.message}
        />
        <TextInput
          prefix={"modal-password"}
          label={"Password"}
          onTextChange={(e) => setValue("password", e)}
          value={watch("password")}
          error={errors.password !== undefined}
          errorText={errors.password?.message}
        />
        <button
          className={"mt-8 modal-register-btn btn btn-primary"}
          onClick={onClickRegister}
        >
          S'inscrire
        </button>
        <p
          className={"mt-2 text-center modal-login-hint cursor-pointer"}
          onClick={props.switchToLogin}
        >
          Vous avez deja un compte ? connectez-vous ici !
        </p>
      </div>
    </Modal>
  );
}
