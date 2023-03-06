import Modal, {ModalProps} from "@/components/Modals/Modal";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import {useForm} from "react-hook-form";
import {validateOrReject, ValidationError} from "class-validator";
import {AuthService} from "@/services/AuthService";
import {RegisterBody, RegisterResponse} from "@/services/AuthService.type";

export type RegisterModalProps = {
  onSuccess: (register: RegisterResponse) => void;
  switchToLogin?: () => void;
  title?: string;
} & ModalProps;

export type Form = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export default function RegisterModal(props: RegisterModalProps) {

  const {watch, setValue, getValues, formState: {errors}, setError, clearErrors} = useForm<Form>({defaultValues: {email: '', password: ''}});

  const onClickRegister = () => {
    const body = new RegisterBody(getValues('email'), getValues('password'), getValues('firstname'), getValues('lastname'));
    clearErrors();
    validateOrReject(body).then(() => {
      AuthService.register(getValues(), (result) => {
        if (result.ok) {
          props.onSuccess(result.ok.body);
        } else if (result.error) {
          console.log(result.error);
        }
      });
    }).catch(errors => {
      errors.forEach((err: ValidationError) => {
        setError(err.property as keyof Form, {message: Object.values(err.constraints ?? {}).join(', ')});
      });
    })
  }

  return (
    <Modal {...props}>
      <div className={"flex flex-col w-full"}>
        <h1 className={"modal-title text-2xl font-bold"}>{props.title ?? 'S\'inscrire'}</h1>
        <TextInput prefix={"modal-lastname"} label={"Nom"} onTextChange={(e) => setValue('lastname', e)} value={watch('lastname')} error={errors.lastname !== undefined} errorText={errors.lastname?.message}/>
        <TextInput prefix={"modal-firstname"} label={"Prénom"} onTextChange={(e) => setValue('firstname', e)} value={watch('firstname')} error={errors.firstname !== undefined} errorText={errors.firstname?.message}/>
        <TextInput prefix={"modal-email"} label={"Email"} onTextChange={(e) => setValue('email', e)} value={watch('email')} error={errors.email !== undefined} errorText={errors.email?.message}/>
        <TextInput prefix={"modal-password"} label={"Password"} onTextChange={(e) => setValue('password', e)} value={watch('password')} error={errors.password !== undefined} errorText={errors.password?.message}/>
        <button className={"mt-8 modal-register-btn btn btn-primary"} onClick={onClickRegister}>
          S'inscrire
        </button>
        <p className={"mt-2 text-center modal-login-hint cursor-pointer"} onClick={props.switchToLogin}>Vous avez deja un compte ? connectez-vous ici !</p>
      </div>
    </Modal>
  )
}