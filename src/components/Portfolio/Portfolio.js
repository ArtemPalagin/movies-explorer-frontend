import linkImage from '../../images/link-image.svg';
import './Portfolio.css';

function Portfolio(props){
  return(
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <a className="portfolio__link" href="https://github.com/ArtemPalagin/how-to-learn" target="_blank" rel="noreferrer">
        <p className="portfolio__link-text">Статичный сайт</p>
        <img className="portfolio__link-image" src={linkImage} alt="Иконка ссылки" />
      </a>
      <a className="portfolio__link" href="https://github.com/ArtemPalagin/russian-travel" target="_blank" rel="noreferrer">
      <p className="portfolio__link-text">Адаптивный сайт</p>
        <img className="portfolio__link-image" src={linkImage} alt="Иконка ссылки" />
      </a>
      <a className="portfolio__link" href="https://github.com/ArtemPalagin/express-mesto" target="_blank" rel="noreferrer">
      <p className="portfolio__link-text">Одностраничное приложение</p>
        <img className="portfolio__link-image" src={linkImage} alt="Иконка ссылки" />
      </a>
    </section>
  )
}
export default Portfolio;