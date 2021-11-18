import linkImage from '../../images/link-image.svg';

function Portfolio(props){
  return(
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <a className="portfolio__link">
        <p className="portfolio__link-text">Статичный сайт</p>
        <img className="portfolio__link-image" src={linkImage} />
      </a>
      <a className="portfolio__link">
      <p className="portfolio__link-text">Адаптивный сайт</p>
        <img className="portfolio__link-image" src={linkImage} />
      </a>
      <a className="portfolio__link">
      <p className="portfolio__link-text">Одностраничное приложение</p>
        <img className="portfolio__link-image" src={linkImage} />
      </a>
    </section>
  )
}
export default Portfolio;