import React from 'react';
import loginImage from '../../images/register-image.svg';
import './Login.css';
import { Link } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailErr: "Заполните это поле",
      passwordErr: "Заполните это поле",
      emailIsInvalid: true,
      passwordIsInvalid: true,
    }
  }
  handleChange = (e) => {
    this.setState({ [`${e.target.name}IsInvalid`]: !e.target.valid && e.target.validationMessage });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.emailIsInvalid || this.state.passwordIsInvalid){
      return
    }
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    this.props.loginRequest(data.email, data.password);

    e.target.reset();
  }

  render() {
    const disableButton = this.state.emailIsInvalid || this.state.passwordIsInvalid
    return (
      <section className="login">
        <img className="login__image" src={loginImage} alt="Не получилось загрузить иконку у поля логина" />
        <h1 className="login__greeting">Добро пожаловать!</h1>
        <form className="login__form" onSubmit={this.handleSubmit} noValidate>
          <p className="login__placeholder">E-mail</p>
          <input className="login__inpute login__inpute-email" onChange={this.handleChange} id="email-input" type="email" name="email" minLength="5" maxLength="40" required />
          <div className="login__span-wrapper">{this.state.emailIsInvalid
            ? <span className="login__span">{this.state.emailIsInvalid}</span>
            : null}</div>
          <p className="login__placeholder">Пароль</p>
          <input className="login__inpute login__inpute-password" onChange={this.handleChange} id="password-input" type="password" name="password" minLength="5" maxLength="40" required />
          <div className="login__span-wrapper">{this.state.passwordIsInvalid
            ? <span className="login__span">{this.state.passwordIsInvalid}</span>
            : null}</div>
          <button className={`login__button ${disableButton ? "login__button_invaled" : ""}`}
            disabled={disableButton}>Войти</button>
          <div className="login__button-span-wrapper">
            {this.props.loginErrorMessage ? <span className="login__button-span">{this.props.loginErrorMessage}</span> : null}
          </div>
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