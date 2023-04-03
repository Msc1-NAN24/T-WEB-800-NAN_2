import { useRouter } from "next/navigation";
import { AuthState, UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import Picture from "@/components/Profile/Picture/Picture";
import Data from "@/components/Profile/Data/Data";
import UpdateInfo from "@/components/Profile/UpdateInfo/UpdateInfo";
import { Preference } from "@/components/Profile/Preference/Preference";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between">
        <Picture img={user?.picture} />
        <Data />
        <UpdateInfo />
        <div className={"w-fit"}>
          <Preference />
        </div>
      </div>
    </div>
  );
};

export default Profile;
