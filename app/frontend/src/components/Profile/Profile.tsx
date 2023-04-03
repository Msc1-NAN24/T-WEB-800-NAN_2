import { useRouter } from "next/navigation";
import { AuthState, UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import Picture from "@/components/Profile/Picture/Picture";
import Data from "@/components/Profile/Data/Data";
import UpdateInfo from "@/components/Profile/UpdateInfo/UpdateInfo";

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
      <UpdateInfo user={user!} />
    </div>
  );
};

export default Profile;
