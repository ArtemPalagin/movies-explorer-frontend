import './AboutMe.css';

function AboutMe(props){
  return(
    <section className="about-me" id="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__wrapper">
        <div className="about-me__text-wrapper">
          <h3 className="about-me__name">Артём</h3>
          <h4 className="about-me__specialization">Фронтенд-разработчик, 19 лет</h4>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className="about-me__links-wrapper">
            <a className="about-me__link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Facebook</a>
            <a className="about-me__link" href="https://github.com/ArtemPalagin" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
        <img className="about-me__avatar" src="https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg" alt="Не получилось загрузить фото студента" />
      </div>
    </section>
  )
}
export default AboutMe;