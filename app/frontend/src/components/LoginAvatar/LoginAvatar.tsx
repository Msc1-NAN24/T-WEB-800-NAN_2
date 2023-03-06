export type LoginAvatarProps = {
  user: unknown;
}

export default function LoginAvatar(props: LoginAvatarProps) {
  return (
    props.user == undefined ? (
      <>
        <h1>Login avatar</h1>
        <button className="login-buttons"></button>
      </>
    ) : (
      <>
        <h1>Login avatar</h1>
        <p className="user-avatar" title="Mathéo Bellanger">Matthéo Bellanger</p>
        <button className="login-buttons" hidden></button>
      </>
    )
    
  )
}