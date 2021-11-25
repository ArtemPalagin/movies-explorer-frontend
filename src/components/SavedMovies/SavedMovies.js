import React from 'react';
import '../Movies/Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import searchImage from '../../images/search-image.svg';
class SavedMovies extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className=" saved-movies movies">
        <div className="movies__search">
          <div className="movies__search-wrapper">
            <input className="movies__inpute" placeholder="Фильм" type="text" name="search" />
            <img className="movies__search-image" src={searchImage} alt="Не получилось загрузить иконку поиска" />
          </div>
          <div className="movies__switch-wrapper">
            <p className="movies__text">Короткометражки</p>
            <div className="movies__switch">
              <input className="movies__switch-checkbox" type="checkbox" name="switcher" />
            </div>
          </div>
        </div>
        <MoviesCardList cards={this.props.cards} />
      </section>
    )
  }
}
export default SavedMovies;