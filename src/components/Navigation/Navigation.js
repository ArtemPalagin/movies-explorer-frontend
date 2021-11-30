import React from 'react';
import './Navigation.css';
import accountImage from '../../images/header-icon.svg';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {

  render() {
    return (
      <div className={`navigation  ${(this.props.NavigationClosed) ? ('navigation_closed') : ('')}`}>
        <div className={`navigation__body ${(this.props.NavigationClosed) ? ('navigation__body_closed') : ('')}`}>
          <button className="navigation__button" onClick={this.props.CloseNavigation}></button>
          <NavLink
            to="/movies"
            activeClassName="navigation__link_active"
            className="navigation__movies-link"
            onClick={this.props.CloseNavigation}>Фильмы</NavLink>
          <NavLink
            to="/saved-movies"
            activeClassName="navigation__link_active"
            className="navigation__saved-movies-link"
            onClick={this.props.CloseNavigation}>Сохранённые фильмы</NavLink>
          <div className="navigation__wrapper">
            <NavLink
              to="/profile"
              activeClassName="navigation__link_active"
              className="navigation__account-link"
              onClick={this.props.CloseNavigation}>Аккаунт</NavLink>
            <img className="navigation__account-image" src={accountImage} alt="Не получилось загрузить иконку аккаунта" />
          </div>
        </div>
      </div>
    )
  }
}
export default Navigation;