import './Header.css';
import topTabLogo from '../../images/top-tab-logo.svg';


function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={topTabLogo} alt="Не получислось загрузить картинку логотипа" />
      <div className="header__links-wrapper">
        <p className="header__registration-link">Регистрация</p>
        <p className="header__login-link">Войти</p>
      </div>
    </header>
  )
}
export default Header;