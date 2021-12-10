import './Header.css';
import topTabLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className={`header ${props.loggedIn ? "header_inactive" : ""}`}>
      <img className="header__logo" src={topTabLogo} alt="Не получислось загрузить картинку логотипа" />
      <div className="header__links-wrapper">
        <Link to="/register" className="header__registration-link">Регистрация</Link>
        <Link to="/sign-in" className="header__login-link">Войти</Link>
      </div>
    </header>
  )
}
export default Header;