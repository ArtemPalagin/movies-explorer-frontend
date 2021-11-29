import React from 'react';
import loginImage from '../../images/register-image.svg';
import './Login.css';
import { Link } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   })
  // }
  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    this.props.loginRequest(data.email, data.password);

    e.target.reset();
  }

  render() {
    return (
      <section className="login">
        <img className="login__image" src={loginImage} alt="Не получилось загрузить иконку у поля логина" />
        <h1 className="login__greeting">Добро пожаловать!</h1>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <p className="login__placeholder">E-mail</p>
          <input className="login__inpute login__inpute-email" id="email-input" type="email" name="email" minLength="5" maxLength="40" />
          <p className="login__placeholder">Пароль</p>
          <input className="login__inpute login__inpute-password" id="password-input" type="password" name="password" minLength="5" maxLength="40" />
          <span className="password-input-error login__span">Что-то пошло не так...</span>
          <button className="login__button">Войти</button>
        </form>
        <div className="login__link-wrapper">
          <p className="login__link-text">Ещё не зарегистрированы?</p>
          <Link to="/register" className="login__link">Регистрация</Link>
        </div>

      </section>
    )
  }

}
export default Login;