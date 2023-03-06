import {User} from "@/utils/type";

export enum AvailableButton {
  Login,
  Register,
  MyProfile,
  Logout,
}

export type LoginAvatarProps = {
  user: User | undefined;
  onClickButton: (button: AvailableButton) => void;
}

export default function LoginSection({user, onClickButton}: LoginAvatarProps) {

  if (user) {
    return (
      <>
        <div className="dropdown dropdown dropdown-end">
          <label tabIndex={0}>
            <div className="avatar cursor-pointer">
              <div className="w-12 rounded">
                <img className={"user-avatar"} title={`${user.firstname} ${user.lastname}`} src={user.picture} alt={user.email}/>
              </div>
            </div>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => onClickButton(AvailableButton.MyProfile)}>Mon profile</a></li>
            <li><a onClick={() => onClickButton(AvailableButton.Logout)}>Logout</a></li>
          </ul>
        </div>
      </>

    )
  } else {
    return (
      <div className={"login-buttons flex flex-row"}>
        <button className={"btn"} onClick={() => onClickButton(AvailableButton.Login)}>Se connecter</button>
        <button className={"btn btn-primary"} onClick={() => onClickButton(AvailableButton.Register)}>S'inscrire</button>
      </div>
    )
  }
  return (<h1>Login avatar</h1>)
}