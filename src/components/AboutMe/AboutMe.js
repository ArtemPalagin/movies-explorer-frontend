import avatar from '../../images/top-tab-logo.svg';

function AboutMe(props){
  return(
    <section className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__wrapper">
        <div className="about-me__text-wrapper">
          <h3 className="about-me__name">Артём</h3>
          <h4 className="about-me__specialization">Фронтенд-разработчик, 19 лет</h4>
          <p className="about-me__text">Я родился и живу в Москве...</p>
          <div className="about-me__links-wrapper">
            <a className="about-me__link" href="#">Facebook</a>
            <a className="about-me__link" href="#">Github</a>
          </div>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Не получилось загрузить фото студента" />
      </div>
    </section>
  )
}
export default AboutMe;