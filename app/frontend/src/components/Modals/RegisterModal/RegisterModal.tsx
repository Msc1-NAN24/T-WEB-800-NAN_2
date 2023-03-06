/* eslint-disable react/no-unescaped-entities */
export default function RegisterModal() {
  return (
    <>
      <h1>RegisterModal</h1>
      <div>
        <label htmlFor="">Nom*</label><br />
        <input type="text" name="" id="nom" />
      </div>
      <div>
        <label htmlFor="">Prénom*</label><br />
        <input type="text" name="" id="prénom" />
      </div>
      <div>
        <label>Email*</label><br />
        <input type="email" name="" id="" />
      </div>
      <div>
        <label>Mot de passe*</label><br />
        <input type="password" name="" id="" />
      </div>
      <button>S'inscrire</button><br />
      <a href="">Vous avez déjà un compte? connectez-vous ici</a>
    </>
  )
}