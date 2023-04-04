'use client';
import { useRouter } from "next/navigation";
import { AuthState, UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import Picture from "@/components/Profile/Picture/Picture";
import Data from "@/components/Profile/Data/Data";

const Profile = () => {
  const router = useRouter();
  const { user, state } = useContext(UserContext);

  useEffect(() => {
    if (state === AuthState.NotLogged) {
      router.push("/");
    }
  }, [state, router, user]);

  return (
    <div className="mx-20">
      <h1 className="text-4xl">Mon Profile</h1>
      <p className="text-2xl mb-20">Gérer les paramètre de votre profile</p>
      <div className="flex flex-col lg:flex-row justify-between">
        <Picture img={user?.picture} />
        <Data />
      </div>
      <form className="flex flex-col gap-4">
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInput123"
            aria-describedby="emailHelp123"
            placeholder="First name" />
          <label
            htmlFor="emailHelp123"
            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >First name
          </label>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInput124"
            aria-describedby="emailHelp124"
            placeholder="Last name" />
          <label
            htmlFor="exampleInput124"
            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Last name
          </label>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="email"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter email" />
          <label
            htmlFor="exampleInputEmail2"
            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Email address
          </label>
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="tel"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInputTelephone2"
            placeholder="Telephone" />
          <label
            htmlFor="exampleInputTelephone2"
            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >Telephone
          </label>
        </div>
      </form>
    </div>
  );
};

export default Profile;
