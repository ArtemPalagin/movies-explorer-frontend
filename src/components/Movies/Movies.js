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

    this.lastTime = 0
    this.scheduled = null

 
  }
  handleResizeEvent = () => {
    if (Date.now() - 200 > this.lastTime) {
      this.loadingResize();
      this.lastTime = Date.now();
      this.scheduled = null
      return
    }

    if (this.scheduled) return

    this.scheduled = setTimeout(() => {
      this.scheduled = null
      this.loadingResize();
      this.lastTime = Date.now()
    }, this.lastTime + 200 - Date.now())

  }
  componentDidMount() {
    // debugger

    window.addEventListener('resize', this.handleResizeEvent)

    this.calcFilms()
  }
  componentDidUpdate(prev) {
    if (prev.keyWord === this.props.keyWord && prev.movies === this.props.movies && prev.shortFilms === this.props.shortFilms) {
      return false
    }

    this.calcFilms()
  }
  calcFilms() {
    if(!this.props.keyWord){
      this.setState({ cards: [], buttonActive: false });
      return
    }
    const filteredMovies = moviesFilter(this.props.movies, this.props.keyWord, this.props.shortFilms);
    const numberOfFilteredMovies = loadingController.download(filteredMovies, this.props.numberOfMovies);
    this.setState({ 
      cards: numberOfFilteredMovies.filteredArray,
      buttonActive: filteredMovies.length !== numberOfFilteredMovies.moviesNumber
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeEvent)
    clearTimeout(this.scheduled)
  }
  downloadMovies = (keyWord) => {
    this.props.setNumberOfMoviesInStorage(0);
    this.props.setKeyWordInStorage(keyWord);

    this.setState({ preloaderActive: true, cards: [], message: "", buttonActive: false });

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
  loadingResize = () => {

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
  loadingMore = () => {
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
        this.props.removeLikedMovies(card);
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
        this.props.addLikedMovies(card);
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
        <button className={`movies__button ${ !this.state.buttonActive ? "movies__button_inactive" : ""}`} onClick={this.loadingMore}>Ещё</button>
      </section>
    )
  }
}
export default Movies;
