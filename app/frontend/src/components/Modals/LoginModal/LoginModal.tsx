import {ModalProps} from "@/components/Modals/Modal";

export type LoginModalProps = {
  title?: string;
  onSuccess: () => void;
  switchToRegister?: () => void;
} & ModalProps;

export default function LoginModal(props: LoginModalProps) {

  const onClickLogin = async () => {

  };

  return (<div>LoginModal</div>)
}