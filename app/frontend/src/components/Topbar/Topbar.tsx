"use client";

import LoginSection, {AvailableButton,} from "@/components/Topbar/LoginSection/LoginSection";
import {useContext} from "react";
import {AuthState, UserContext} from "@/contexts/UserContext";
import {useModals} from "@/hooks/useModals";
import LoginModal from "@/components/Modals/LoginModal/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal/RegisterModal";
import {useRouter} from "next/navigation";

type Modals = {
  login: boolean;
  register: boolean;
};

export default function Topbar() {
  const router = useRouter();
  const { login, register, updateModals, updateAllModals } = useModals<Modals>({
    login: false,
    register: false,
  });
  const ctx = useContext(UserContext);

  const onClickRegister = () => {
    updateAllModals({ login: false, register: true });
  };

  const onClickLogin = () => {
    updateAllModals({ login: true, register: false });
  };

  const onClickLogout = () => {
    ctx.onLogout(() => {
      console.log("Logout");
    });
  };

  const actions = {
    [AvailableButton.Register]: () => onClickRegister(),
    [AvailableButton.Login]: () => onClickLogin(),
    [AvailableButton.Logout]: () => onClickLogout(),
    [AvailableButton.MyProfile]: () => router.push("/profile"),
  };

  return (
    <>
      <LoginModal
        onSuccess={() => updateModals("login", false)}
        open={login}
        onDismiss={() => updateModals("login", false)}
        switchToRegister={() =>
          updateAllModals({ login: false, register: true })
        }
      />
      <RegisterModal
        onSuccess={() => updateModals("register", false)}
        open={register}
        onDismiss={() => updateModals("register", false)}
        switchToLogin={() => updateAllModals({ login: true, register: false })}
      />
      <div className={"flex flex-row items-center w-full p-4 justify-between "}>
        <div className="flex flex-row items-center">
          <img
            className={"logo rounded-xl"}
            alt={"logo"}
            src={"/atrip.png"}
            height={80}
            width={80}
            title={"Trip"}
          />
          <ul className={"invisible sm:visible ml-8 flex flex-row gap-10"}>
            <li className={"text-lg cursor-pointer"} onClick={() => router.push('/')}>Accueil</li>
            {ctx.state === AuthState.Logged ? <li className={"text-lg cursor-pointer"} onClick={() => router.push('/')}>Mes planifications</li> : null}
          </ul>
        </div>

        <LoginSection
          user={ctx.user}
          onClickButton={(a) => {
            actions[a]();
          }}
        />
      </div>
    </>
  );
}
