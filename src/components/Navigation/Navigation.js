import './Navigation.css';
import accountImage from '../../images/header-icon.svg';

function Navigation(props){
  return(
    <div className={`navigation  ${(props.NavigationClosed) ? ('navigation_closed') : ('')}`}>
      <button className="navigation__button"></button>
      <p className="navigation__movies-link">Фильмы</p>
      <p className="navigation__saved-movies-link">Сохранённые фильмы</p>
      <div className="navigation__wrapper">
        <p className="navigation__account-link">Аккаунт</p>
        <img className="navigation__account-image" src={accountImage} alt="Не получилось загрузить иконку аккаунта" />
      </div>
      
    </div>
  )
}
export default Navigation;