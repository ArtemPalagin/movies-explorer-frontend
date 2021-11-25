import React from 'react';
import './HeaderLogged.css';
import loggedLogo from '../../images/register-image.svg';
import headerIcon from '../../images/header-icon.svg';
import headerNavigationButtom from '../../images/header-navigation-buttom.svg';
import Navigation from '../Navigation/Navigation.js';

class HeaderLogged extends React.Component() {
  constructor(props){
    super(props);
    this.state = {
      NavigationClosed: true,
    }
  }
  rende() {
    return (
      <header className="header_logged">
        <Navigation NavigationClosed={this.props.NavigationClosed} />
        <img className="header_logged__logo" src={loggedLogo} alt="Не получислось загрузить картинку логотипа" />
        <img className="header_logged__navigation-button" src={headerNavigationButtom} alt="Не получилось загрузть иконку для навигации" />
        <div className="header_logged__links-wrapper" >
          <p className="header_logged__movies-link">Фильмы</p>
          <p className="header_logged__saved-movies-link">Сохранённые фильмы</p>
          <p className="header_logged__account-link">Аккаунт</p>
          <img className="header_logged__account-image" src={headerIcon} alt="Не получилось загрузить иконку аккаунта" />
        </div>
      </header>
    )
  }

}
export default HeaderLogged;