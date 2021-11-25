import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

class MoviesCardList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="movies-card-list">
        {this.props.cards.map((card) => (
          <MoviesCard card={card} />
        ))}
      </section>
    )
  }

}
export default MoviesCardList;