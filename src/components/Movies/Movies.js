import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import SearchForm from '../SearchForm/SearchForm.js';

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="movies">
        <SearchForm />
        <MoviesCardList cards={this.props.cards} />
        <Preloader />
        <button className="movies__button">Ещё</button>
      </section>
    )
  }
}
export default Movies;
