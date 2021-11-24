import './Profile.css';

function Profile(props){
  return(
    <section className="profile">
      <h1 className="profile__greeting">Привет, Артём!</h1>
      <form className="profile__form">
        <div className="profile__inpute-wrapper">
          <p className="profile__placeholder">Имя</p>
          <input className="profile__inpute profile__inpute-email"  id="email-input" type="email" name="username" minLength="2" maxLength="40" />
        </div>
        <div className="profile__inpute-wrapper">
          <p className="profile__placeholder">Email</p>
          <input className="profile__inpute profile__impute-password"  id="password-input" type="password" name="email" minLength="2" maxLength="200" />
          <span className="profile__span">что то пошло не так ...</span>
        </div>
          
          <button className="profile__editing">Редактировать</button>
        </form>
        <button className="profile__exit">Выйти из аккаунта</button>
    </section>
  )
}
export default Profile;