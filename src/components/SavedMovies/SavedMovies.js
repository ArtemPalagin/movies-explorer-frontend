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
      moviesArray: [],
      cards: [],
    }
  }
  static getDerivedStateFromProps(props, state) {
    return { moviesArray: props.likedMovies }
  }
  componentDidMount() {
    this.setState({ cards: this.props.likedMovies, moviesArray: this.props.likedMovies });
  }

  downloadMovies = (keyWord) => {

    const filteredMovies = moviesFilter(this.state.moviesArray, keyWord, this.state.shortFilms);

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
    mainApi.deleteMovie(card.id).then((movie) => {
      const cardsAfterDeletion = this.state.cards.filter((elem) => {
        if (elem.id === card.id) {
          return false;
        } else {
          return true;
        }
      })
      const movieData = movie;
      debugger
      this.props.likedMoviesRemove({
        ...movieData,
        image: {
          url: movieData.image,
          formats: {
            thumbnail: {
              url: movieData.thumbnail
            }
          },
        },
        trailerLink: movieData.trailer,
        id: movieData.movieId,
      });
      this.setState({ cards: cardsAfterDeletion });
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <section className="saved-movies movies">
        <SearchForm downloadMovies={this.downloadMovies} changeShortFilms={this.changeShortFilms} />
        <MoviesCardList cards={this.state.cards} changeLike={this.deleteMovie} deleteButton={true} />
        <Preloader preloaderActive={false} message={this.state.message} />
      </section>
    )
  }
}
export default SavedMovies;