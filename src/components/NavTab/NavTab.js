import './NavTab.css';

function NavTab(props){
  return(
    <section className="nav-tab">
      <a className="nav-tab__link" href="#about-project">О проекте</a>
      <a className="nav-tab__link" href="#techs">Технологии</a>
      <a className="nav-tab__link" href="#about-me">Студент</a>
    </section>
  )
}
export default NavTab;