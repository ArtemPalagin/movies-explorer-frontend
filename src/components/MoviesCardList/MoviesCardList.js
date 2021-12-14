import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      {props.cards.map((card) => (
        <MoviesCard
          key={card.id}
          card={card} changeLike={props.changeLike} deleteButton={props.deleteButton} />
      ))}
    </section>
  )


}
export default MoviesCardList;