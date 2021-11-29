import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
    }
  }
  static contextType = CurrentUserContext;
  componentDidMount(){
    this.setState({ name: this.context.name, email: this.context.email});
  }
  
  exitRequest = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    this.props.profileSubmit(data.name, data.email);
  }

  render() {
    return (
      <section className="profile">
        <h1 className="profile__greeting">Привет, Артём!</h1>
        <form className="profile__form" onSubmit={this.handleSubmit}>
          <div className="profile__inpute-wrapper">
            <p className="profile__placeholder">Имя</p>
            <input 
              value={this.state.name}
              onChange={this.handleOnChange}
              className="profile__inpute profile__inpute-username" id="username-input" type="text" name="name" minLength="2" maxLength="40" />
          </div>
          <div className="profile__inpute-wrapper">
            <p className="profile__placeholder">Email</p>
            <input 
               value={this.state.email}
               onChange={this.handleOnChange}
            className="profile__inpute profile__inpute-email" id="email-input" type="email" name="email" minLength="2" maxLength="200" />
            <span className="profile__span">что то пошло не так ...</span>
          </div>

          <button className="profile__editing">Редактировать</button>
        </form>
        <button className="profile__exit" onClick={this.exitRequest}>Выйти из аккаунта</button>
      </section>
    )
  }

}
export default withRouter(Profile);