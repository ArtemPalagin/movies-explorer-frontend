import React from 'react';
// import likeDeactivates from '../../images/like-deactivates';
import './MoviesCard.css';

class MoviesCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="movies-card">
        <img className="movies-card__image" src={this.props.card.image} alt="не получилось загрузить изображение фильма" />
        <div className="movies-card__wrapper">
          <h3 className="movies-card__title">{this.props.card.text}</h3>
          <button className={`movies-card__like-button ${(this.props.card.like) ? ("movies-card__like-button_liked") : ("")} `}></button>
        </div>
        <p className="movies-card__time">{this.props.card.time}</p>
      </section>
    )
  }

}
export default MoviesCard;