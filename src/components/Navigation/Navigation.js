import './Navigation.css';
import accountImage from '../../images/header-icon.svg';
import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
    <div className={`navigation  ${(props.NavigationClosed) ? ('navigation_closed') : ('')}`}>
      <div className={`navigation__body ${(props.NavigationClosed) ? ('navigation__body_closed') : ('')}`}>
        <button className="navigation__button" onClick={props.CloseNavigation}></button>
        <Link to="/movies" className="navigation__movies-link">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__saved-movies-link">Сохранённые фильмы</Link>
        <div className="navigation__wrapper">
          <Link to="/profile" className="navigation__account-link">Аккаунт</Link>
          <img className="navigation__account-image" src={accountImage} alt="Не получилось загрузить иконку аккаунта" />
        </div>
      </div>
    </div>
  )
}
export default Navigation;