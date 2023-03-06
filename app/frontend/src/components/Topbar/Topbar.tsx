'use client';

import LoginSection, {AvailableButton} from "@/components/Topbar/LoginSection/LoginSection";
import {useContext} from "react";
import {UserContext} from "@/contexts/UserContext";
import {useModals} from "@/hooks/useModals";
import LoginModal from "@/components/Modals/LoginModal/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal/RegisterModal";
import {useRouter} from "next/navigation";

type Modals = {
  login: boolean,
  register: boolean,
}

export default function Topbar() {

  const router = useRouter();
  const {login, register, updateModals, updateAllModals} = useModals<Modals>({login: false, register: false});
  const ctx = useContext(UserContext);

  const onClickRegister = () => {
    updateAllModals({login: false, register: true});
  }

  const onClickLogin = () => {
    updateAllModals({login: true, register: false});
  }

  const onClickLogout = () => {
    ctx.onLogout(() => {
      console.log('Logout');
    });
  }

  const actions = {
    [AvailableButton.Register]: () => onClickRegister(),
    [AvailableButton.Login]: () => onClickLogin(),
    [AvailableButton.Logout]: () => onClickLogout(),
    [AvailableButton.MyProfile]: () => router.push('/'),
  }

  return (
    <>
      <LoginModal onSuccess={() => null} open={login} onDismiss={() => updateModals('login', false)} switchToRegister={() => updateAllModals({login: false, register: true})}/>
      <RegisterModal onSuccess={() => null} open={register} onDismiss={() => updateModals('register', false)} switchToLogin={() => updateAllModals({login: true, register: false})}/>
      <div className={"flex flex-row items-center w-full p-4"}>
        <img className={"logo"} alt={"logo"} src={"https://www.a2sci.re/wp-content/uploads/2016/12/logo-placeholder.png"} height={80} width={80} title={"Trip"}/>
        <ul className={"ml-8"}>
          <li>Accueil</li>
        </ul>
        <div className={"float-right right-0 ml-auto"}>
          <LoginSection user={ctx.user} onClickButton={(a) => {actions[a]()}
          }/>
        </div>
      </div>
    </>
  )
}