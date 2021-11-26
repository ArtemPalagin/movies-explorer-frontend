import React from 'react';
import './HeaderLogged.css';
import loggedLogo from '../../images/register-image.svg';
import headerIcon from '../../images/header-icon.svg';
import headerNavigationButtom from '../../images/header-navigation-buttom.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

class HeaderLogged extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      NavigationClosed: false,
    }
  }
  CloseNavigation = () => {
    this.setState({ NavigationClosed: !this.state.NavigationClosed});
  }
  render() {
    return (
      <header className="header_logged">
        <Navigation NavigationClosed={this.state.NavigationClosed} CloseNavigation={this.CloseNavigation} />
        <img className="header_logged__logo" src={loggedLogo} alt="Не получислось загрузить картинку логотипа" />
        <img className="header_logged__navigation-button" src={headerNavigationButtom} onClick={this.CloseNavigation} alt="Не получилось загрузть иконку для навигации" />
        <div className="header_logged__links-wrapper" >
          <Link to="/movies" className="header_logged__movies-link">Фильмы</Link>
          <Link to="/saved-movies" className="header_logged__saved-movies-link">Сохранённые фильмы</Link>
          <Link to="/profile" className="header_logged__account-link">Аккаунт</Link>
          <img className="header_logged__account-image" src={headerIcon} alt="Не получилось загрузить иконку аккаунта" />
        </div>
      </header>
    )
  }

}
export default HeaderLogged;