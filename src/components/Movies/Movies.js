import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import moviesFilter from '../../utils/MoviesFilter.js';
import createArrayWithLikes from '../../utils/createArrayWithLikes.js';
import * as loadingController from '../../utils/loadingController.js';

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preloaderActive: false,
      buttonActive: false,
      message: "",
      cards: [],
    }

    let lastTime = 0
    let scheduled = false

    window.addEventListener('resize', () => {
      if (Date.now() - 200 > lastTime) {
        this.resizeLoading();
        lastTime = Date.now();
        scheduled = false
        return
      }

      if (scheduled) return

      scheduled = true

      setTimeout(() => {
        scheduled = false
        this.resizeLoading();
        lastTime = Date.now()
      }, lastTime + 200 - Date.now())

    })


    setTimeout(() => {

    }, 200)

  }
  componentDidMount() {
    // debugger
    if(!this.props.keyWord){
      return
    }
    const filteredMovies = moviesFilter(this.props.movies, this.props.keyWord, this.props.shortFilms);
    const numberOfFilteredMovies = loadingController.download(filteredMovies, this.props.numberOfMovies);
    this.setState({ cards: numberOfFilteredMovies.filteredArray });
    if (this.props.movies.length === this.props.numberOfMovies) {
      this.setState({ buttonActive: false });
    } else {
      this.setState({ buttonActive: true });
    }
  }
  downloadMovies = (keyWord) => {
    this.props.setNumberOfMoviesInStorage(0);
    this.props.setKeyWordInStorage(keyWord);

    this.setState({ preloaderActive: true, cards: [], message: "" });

    moviesApi.getMoviesFromServer().then((movies) => {

      this.props.setMoviesInStorage(movies);

      const filteredMoviesWithLikes = createArrayWithLikes(movies, this.props.likedMovies);

      const filteredMovies = moviesFilter(filteredMoviesWithLikes, keyWord, this.props.shortFilms);

      this.setState({ preloaderActive: false });
      if (!filteredMovies.length) {
        this.setState({ message: "Ничего не найдено" });
      }

      const numberOfFilteredMovies = loadingController.download(filteredMovies, 0);

      this.props.setNumberOfMoviesInStorage(numberOfFilteredMovies.moviesNumber);

      const cards = numberOfFilteredMovies.filteredArray

      console.log({numberOfMovies: this.props.numberOfMovies, numberOfFilteredMovies})
      this.setState({ cards: cards, preloaderActive: false });

      if (filteredMovies.length === numberOfFilteredMovies.moviesNumber) {
        this.setState({ buttonActive: false });
      } else {
        this.setState({ buttonActive: true });
      }
      this.props.setMoviesInStorage(filteredMoviesWithLikes);
    }).catch((err) => {

      this.setState({ preloaderActive: false, message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" });

      console.log(err);
    })
  }
  resizeLoading = () => {

    const filteredMovies = moviesFilter(this.props.movies, this.props.keyWord, this.props.shortFilms);

    const numberOfFilteredMovies = loadingController.download(filteredMovies, this.props.numberOfMovies);

    this.props.setNumberOfMoviesInStorage(numberOfFilteredMovies.moviesNumber);
    // debugger
    this.setState({ cards: numberOfFilteredMovies.filteredArray });

    if (filteredMovies.length === numberOfFilteredMovies.moviesNumber) {
      this.setState({ buttonActive: false });
    } else {
      this.setState({ buttonActive: true });
    }
  }
  moreLoading = () => {
    const filteredMovies = moviesFilter(this.props.movies, this.props.keyWord, this.props.shortFilms);

    const numberOfFilteredMovies = loadingController.additionalDownload(filteredMovies, this.props.numberOfMovies);

    this.props.setNumberOfMoviesInStorage(numberOfFilteredMovies.moviesNumber);

    this.setState({ cards: numberOfFilteredMovies.filteredArray });
    // debugger
    if (filteredMovies.length === numberOfFilteredMovies.moviesNumber) {
      this.setState({ buttonActive: false });
    } else {
      this.setState({ buttonActive: true });
    }
  }
  changeLike = (card) => {

    if (card.liked) {
      // debugger
      mainApi.deleteMovie(card.id).then(() => {
        const cardsAfterdisliked = this.state.cards.map(item => {
          if (card.id === item.id) {

            return {
              ...item,
              liked: false
            }
          }
          return item;
        })
        this.setState({ cards: cardsAfterdisliked });
        this.props.likedMoviesRemove(card);
      }).catch((err) => {
        console.log(err);
      })
    } else {
      mainApi.postMovie(card.country, card.director, card.duration, card.year, card.description, `https://api.nomoreparties.co${card.image.url}`, card.trailerLink, card.nameRU, card.nameEN, `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`, card.id).then(() => {
        const cardsAfterLiked = this.state.cards.map(item => {
          if (card.id === item.id) {
            return {
              ...item,
              liked: true
            }
          }
          return item;
        })
        // debugger
        this.props.likedMoviesAdd(card);
        this.setState({ cards: cardsAfterLiked });
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  changeShortFilms = () => {
    this.props.setShortFilmsInState(!this.props.shortFilms);
  }
  searchSubmit = () => {
    this.props.setShortFilmsInStorage(this.props.shortFilms);
  }
  render() {
    return (
      <section className="movies" >
        <SearchForm searchSubmit={this.searchSubmit} keyWord={this.props.keyWord} downloadMovies={this.downloadMovies} changeShortFilms={this.changeShortFilms} shortFilms={this.props.shortFilms} />
        <MoviesCardList cards={this.state.cards} changeLike={this.changeLike} deleteButton={false} />
        <Preloader preloaderActive={this.state.preloaderActive} message={this.state.message} />
        <button className={`movies__button ${ !this.state.buttonActive ? "movies__button_inactive" : ""}`} onClick={this.moreLoading}>Ещё</button>
      </section>
    )
  }
}
export default Movies;
