import registerImage from '../../images/register-image.svg';
import './Register.css';


function Register(props){
  return(
    <section className="register">
      <img className="register__image" src={registerImage} alt="Не получилось загрузить иконку у поля регистрации" />
      <h1 className="register__greeting">Добро пожаловать!</h1>
      <form className="register__form">
        <p className="register__placeholder">Имя</p>
        <input className="register__inpute register__inpute-username"  id="username-input" type="text" name="username" minLength="2" maxLength="40" />
        {/* <span className="username-input-error register__span"></span> */}
        <p className="register__placeholder">E-mail</p>
        <input className="register__inpute register__inpute-email"  id="email-input" type="email"  name="email" minLength="5" maxLength="40" />
        {/* <span className="email-input-error register__span"></span> */}
        <p className="register__placeholder">Пароль</p>
        <input className="register__inpute register__inpute-password"  id="password-input" type="password"  name="password" minLength="5" maxLength="40" />
        <span className="password-input-error register__span">Что-то пошло не так...</span>
        <button className="register__button">Зарегистрироваться</button>
      </form>
      <div className="register__link-wrapper">
        <p className="register__link-text">Уже зарегистрированы?</p>
        <p className="register__link">Войти</p>
      </div>
      
    </section>
  )
}
export default Register;