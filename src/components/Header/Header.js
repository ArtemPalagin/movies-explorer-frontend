import topTabLogo from '../../images/top-tab-logo.svg';

function Header(props){
  return(
    <header className="header">
      <img className="header__logo" src={topTabLogo} alt="Не получислось загрузить картинку логотипа" />
      <div className="header__buttons-wrapper" >
        <button className="header__registration-button">Регистрация</button>
        <button className="header__login-button">Войти</button>
      </div>
    </header>
  )
}
export default Header;