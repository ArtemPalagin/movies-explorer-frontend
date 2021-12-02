import React from 'react';
import '../Movies/Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

class SavedMovies extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="saved-movies movies">
        <SearchForm />
        <MoviesCardList cards={this.props.cards} />
      </section>
    )
  }
}
export default SavedMovies;
