function Profile(props){
  return(
    <section className="profile">
      <h1 className="profile__greeting">Привет, Артём!</h1>
        <input className="profile__inpute profile__inpute-username"  id="username-input" type="text" placeholder="Имя" name="username" minLength="2" maxLength="40" />
        <span className="username-input-error profile__span"></span>
        <input className="profile__inpute profile__impute-email"  id="email-input" type="text" placeholder="Email" name="email" minLength="2" maxLength="200" />
        <span className="email-input-error profile__span"></span>
        <button className="profile__editing">Редактировать</button>
        <button className="profile__exit">Выйти из аккаунта</button>
    </section>
  )
}
export default Profile;