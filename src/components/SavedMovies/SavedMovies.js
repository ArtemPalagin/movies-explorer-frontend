import React from 'react';
import '../Movies/Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import moviesFilter from '../../utils/MoviesFilter.js';
import mainApi from "../../utils/MainApi.js"

class SavedMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      shortFilms: false,
      cards: [],
    }
  }
  componentDidMount() {
    this.acceptMovies()
  }
  componentDidUpdate(prev) {
    if (prev.likedMovies === this.props.likedMovies) {
      return
    }

    this.acceptMovies()
  }
  acceptMovies() {
    this.setState({ cards: this.props.likedMovies });
  }

  downloadMovies = (keyWord) => {
    debugger
    const filteredMovies = moviesFilter(this.props.likedMovies, keyWord, this.state.shortFilms);

    this.setState({ cards: filteredMovies })

    if (!filteredMovies.length) {
      this.setState({ message: "Ничего не найдено" });
    } else {
      this.setState({ message: "" });
    }
  }
  changeShortFilms = () => {
    this.setState({ shortFilms: !this.state.shortFilms })
  }
  deleteMovie = (card) => {
    mainApi.deleteMovie(card.id).then(() => {
      const cardsAfterDeletion = this.state.cards.filter((elem) => {
        if (elem.id === card.id) {
          return false;
        } else {
          return true;
        }
      })
      // debugger
      this.setState({ cards: cardsAfterDeletion });
      this.props.likedMoviesRemove(card);
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <section className="saved-movies movies">
        <SearchForm downloadMovies={this.downloadMovies} changeShortFilms={this.changeShortFilms} shortFilms={this.state.shortFilms} />
        <MoviesCardList cards={this.state.cards} changeLike={this.deleteMovie} deleteButton={true} />
        <Preloader preloaderActive={false} message={this.state.message} />
      </section>
    )
  }
}
export default SavedMovies;