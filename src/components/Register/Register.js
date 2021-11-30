import React from 'react';
import registerImage from '../../images/register-image.svg';
import './Register.css';
import { Link } from 'react-router-dom';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameErr: "Заполните это поле",
      emailErr: "Заполните это поле",
      passwordErr: "Заполните это поле",
      nameIsInvalid: true,
      emailIsInvalid: true,
      passwordIsInvalid: true,
    }
  }
  handleChange = (e) => {
    this.setState({ [`${e.target.name}IsInvalid`]: !e.target.valid && e.target.validationMessage });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    this.props.registrationRequest(data.name, data.email, data.password);
    e.target.reset();
  }
  render() {
    const disableButton = this.state.nameIsInvalid || this.state.emailIsInvalid || this.state.passwordIsInvalid
    return (
      <section className="register">
        <img className="register__image" src={registerImage} alt="Не получилось загрузить иконку у поля регистрации" />
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={this.handleSubmit} noValidate>
          <p className="register__placeholder">Имя</p>
          <input className="register__inpute register__inpute-username" onChange={this.handleChange} id="username-input" type="text" name="name" minLength="2" maxLength="40" required />
          <div className="register__span-wrapper">{this.state.nameIsInvalid
            ? <span className="register__span">{this.state.nameIsInvalid}</span>
            : null
          }</div>
          <p className="register__placeholder">E-mail</p>
          <input className="register__inpute register__inpute-email" onChange={this.handleChange} id="email-input" type="email" name="email" minLength="5" maxLength="40" required />
          <div className="register__span-wrapper">{this.state.emailIsInvalid
            ? <span className="register__span">{this.state.emailIsInvalid}</span>
            : null}</div>
          <p className="register__placeholder">Пароль</p>
          <input className="register__inpute register__inpute-password" onChange={this.handleChange} id="password-input" type="password" name="password" minLength="8" maxLength="40" required />
          <div className="register__span-wrapper">{this.state.passwordIsInvalid
            ? <span className="register__span">{this.state.passwordIsInvalid}</span>
            : null}</div>
          <button className={`register__button ${disableButton ? "register__button_invaled" : ""}`}
            disabled={disableButton}>Зарегистрироваться</button>
          <div className="register__button-span-wrapper">
            {this.props.registrationErrorMessage ? <span className="register__button-span">{this.props.registrationErrorMessage}</span> : null}
          </div>
        </form>
        <div className="register__link-wrapper">
          <p className="register__link-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__link">Войти</Link>
        </div>

      </section>
    )
  }

}
export default Register;