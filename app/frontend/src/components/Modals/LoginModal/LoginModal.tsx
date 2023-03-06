/* eslint-disable react/no-unescaped-entities */
export default function LoginModal() {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h1>LoginModal</h1>
      <div>
        <label>Email</label><br />
        <input type="email" name="" id="" />
      </div>
      <div>
        <label>Mot de passe</label><br />
        <input type="password" name="" id="" />
      </div>
      <button>Se connecter</button><br />
      <a href="">Vous n'avez pas de compte ? inscrivez-vous ici</a>
    </div>
  )
}