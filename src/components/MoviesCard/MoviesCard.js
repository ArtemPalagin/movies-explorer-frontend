import React from 'react';
import './MoviesCard.css';
import ensureServer from "../../utils/ensureServer.js"

class MoviesCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      liked: this.props.card.liked,
    }
  }
  changeCardLike = () => {
    this.props.changeLike(this.props.card);
  }
  render() {
    return (
      <section className="movies-card">
        <a className="movies-card__link" href={this.props.card.trailerLink}>
          <img 
            className="movies-card__image" 
            src={ensureServer(this.props.card.image.url)} 
            alt="не получилось загрузить изображение фильма" />
        </a>
        <div className="movies-card__wrapper">
          <h3 className="movies-card__title">{this.props.card.nameRU}</h3>
          <button onClick={this.changeCardLike} className={`movies-card__like-button ${(this.props.deleteButton) ? ("movies-card__like-button_cross") : (`${this.props.card.liked ? ("movies-card__like-button_liked") : ("")}`)} `}></button>
        </div>
        <p className="movies-card__time">{`${Math.floor(this.props.card.duration / 60) === 0 ? "" : `${Math.floor(this.props.card.duration / 60)}ч`}${this.props.card.duration % 60 === 0 ? "" : `${this.props.card.duration % 60}м`}`}</p>
      </section>
    )
  }

}
export default MoviesCard;