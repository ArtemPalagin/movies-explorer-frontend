import React from 'react';
import registerImage from '../../images/register-image.svg';
import './Register.css';
import { Link } from 'react-router-dom';


class Register extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   name: "",
  //   //   email: "",
  //   //   password: "",
  //   // }
  // }
  // handleChange = (e) => {
  //   // debugger
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   })
  // }
  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    // debugger
    this.props.registrationRequest(data.name, data.email, data.password);
    // this.setState({
    //   name: "",
    //   email: "",
    //   password: ""
    // });
    e.target.reset();
  }
  render() {
    return (
      <section className="register">
        <img className="register__image" src={registerImage} alt="Не получилось загрузить иконку у поля регистрации" />
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={this.handleSubmit}>
          <p className="register__placeholder">Имя</p>
          <input className="register__inpute register__inpute-username" onChange={this.handleChange} id="username-input" type="text" name="name" minLength="2" maxLength="40" />
          <p className="register__placeholder">E-mail</p>
          <input className="register__inpute register__inpute-email" onChange={this.handleChange} id="email-input" type="email" name="email" minLength="5" maxLength="40" />
          <p className="register__placeholder">Пароль</p>
          <input className="register__inpute register__inpute-password" onChange={this.handleChange} id="password-input" type="password" name="password" minLength="5" maxLength="40" />
          <span className="password-input-error register__span">Что-то пошло не так...</span>
          <button className="register__button">Зарегистрироваться</button>
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