import likeDeactivates from '../../images/like-deactivates';
import './MoviesCard.css';

function MoviesCard(props){
  return(
    <section className="movies-card">
      <img className="movies-card__image" alt="не получилось загрузить изображение фильма" />
      <div className="movies-card__wrapper">
        <h3 className="movies-card__title">33 слова о дизайне</h3>
        <button className="movies-card__like-button">
          <img className="movies-card__like-button-image" src={likeDeactivates} alt="не получилось загрузить иконку лайка" />
        </button>
      </div>
      <p className="movies-card__time">1ч42м</p>
    </section>
  )
}
export default MoviesCard;