import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameErr: "Заполните это поле",
      emailErr: "Заполните это поле",
      nameIsInvalid: false,
      emailIsInvalid: false,
      name: "",
      email: "",
    }
  }
  static contextType = CurrentUserContext;
  componentDidMount() {
    this.setState({ name: this.context?.name, email: this.context?.email });
  }

  exitRequest = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('user');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('likedMovies');
    localStorage.removeItem('shortFilms');
    this.props.loggedChange();
    this.props.history.push('/');
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}IsInvalid`]: !e.target.valid && e.target.validationMessage 
    });
  }
  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.allowedToSubmit()) {
      return
    }

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    this.props.profileSubmit(data.name, data.email);
  }
  allowedToSubmit() {
    const disableButton = this.state.nameIsInvalid || this.state.emailIsInvalid
    const hasChanges = this.state.email !== this.context.email || this.state.name !== this.context.name

    return !disableButton && hasChanges
  }

  render() {
    if (!this.context) {
      return null
    }

    const okToSubmit = this.allowedToSubmit()

    
    return (
      <section className="profile">
        <h1 className="profile__greeting">{`Привет, ${this.context.name}!`}</h1>
        <form className="profile__form" onSubmit={this.handleSubmit}>
          <div className="profile__inpute-wrapper">
            <p className="profile__placeholder">Имя</p>
            <input
              value={this.state.name}
              onChange={this.handleChange}
              className="profile__inpute profile__inpute-username" id="username-input" type="text"  pattern="[A-Za-zА-Яа-яЁё\s\-]+" name="name" minLength="2" maxLength="40" required />
          </div>
          <div className="profile__span-wrapper">{this.state.nameIsInvalid
            ? <span className="profile__span">{this.state.nameIsInvalid}</span>
            : null
          }</div>
          <div className="profile__inpute-wrapper">
            <p className="profile__placeholder">Email</p>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              className="profile__inpute profile__inpute-email" id="email-input" type="email" name="email" minLength="2" maxLength="100" required />
          </div>
          <div className="profile__span-wrapper">{this.state.emailIsInvalid
            ? <span className="profile__span profile__span_last">{this.state.emailIsInvalid}</span>
            : null}</div>
          <button className={`profile__button ${(!okToSubmit) ? "profile__button_invaled" : ""}`}
            disabled={!okToSubmit}>Редактировать</button>
          <div className="profile__button-span-wrapper">
            {this.props.profileErrorMessage ? <span className="profile__button-span">{this.props.profileErrorMessage}</span> : null}
          </div>
        </form>
        <button className="profile__exit" onClick={this.exitRequest}>Выйти из аккаунта</button>
      </section>
    )
  }

}
export default withRouter(Profile);