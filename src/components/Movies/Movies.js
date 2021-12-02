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
      shortFilms: false,
      buttonActive: false,
      message: "",
      numberOfCards: 0,
      cards: [],
      moviesArray: [],
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
    const tryParse = (str) => {
      try {
        return str && JSON.parse(str)
      } catch (e) {
        return null
      }
    }

    const movies = tryParse(localStorage.getItem('movies'))
    const allMovies = tryParse(localStorage.getItem('allMovies'))
    const shortFilms = tryParse(localStorage.getItem('shortFilms'))
    this.setState({ shortFilms: shortFilms });
    if (movies) {
      this.setState({ cards: movies.filteredArray, numberOfCards: movies.moviesNumber, moviesArray: allMovies });
      if (allMovies.length === movies.moviesNumber) {
        this.setState({ buttonActive: false });
      } else {
        this.setState({ buttonActive: true });
      }
    }
  }
  downloadMovies = (keyWord) => {

    this.setState({ preloaderActive: true, cards: [], numberOfCards: 0, message: "" });

    moviesApi.getMoviesFromServer().then((movies) => {
        
        const filteredMovies = moviesFilter(movies, keyWord, this.state.shortFilms);
        
        const filteredMoviesWithLikes = createArrayWithLikes(filteredMovies, this.props.likedMovies);
        this.setState({ preloaderActive: false });
        if (!filteredMoviesWithLikes.length) {
          this.setState({ message: "Ничего не найдено" });
        }

        const numberOfFilteredMovies = loadingController.download(filteredMoviesWithLikes, this.state.numberOfCards);

        this.setState({ cards: numberOfFilteredMovies.filteredArray, numberOfCards: numberOfFilteredMovies.moviesNumber, moviesArray: filteredMoviesWithLikes, preloaderActive: false });
        if (this.state.moviesArray.length === this.state.numberOfCards) {
          this.setState({ buttonActive: false });
        } else {
          this.setState({ buttonActive: true });
        }
        localStorage.setItem('movies', JSON.stringify(numberOfFilteredMovies));
        localStorage.setItem('allMovies', JSON.stringify(filteredMoviesWithLikes));
    }).catch((err) => {

      this.setState({ preloaderActive: false, message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" });

      console.log(err);
    })
  }
  resizeLoading = () => {

    const numberOfFilteredMovies = loadingController.download(this.state.moviesArray, this.state.numberOfCards);

    this.setState({ cards: numberOfFilteredMovies.filteredArray, numberOfCards: numberOfFilteredMovies.moviesNumber });

    if (this.state.moviesArray.length === this.state.numberOfCards) {
      this.setState({ buttonActive: false });
    } else {
      this.setState({ buttonActive: true });
    }
  }
  moreLoading = () => {
    const numberOfFilteredMovies = loadingController.additionalDownload(this.state.moviesArray, this.state.numberOfCards);

    this.setState({ cards: numberOfFilteredMovies.filteredArray, numberOfCards: numberOfFilteredMovies.moviesNumber + 1 });
    // debugger
    if (this.state.moviesArray.length === this.state.numberOfCards) {
      this.setState({ buttonActive: false });
    } else {
      this.setState({ buttonActive: true });
    }
    localStorage.setItem('movies', JSON.stringify(numberOfFilteredMovies));
  }
  changeShortFilms = () => {
    localStorage.setItem('shortFilms', JSON.stringify(!this.state.shortFilms));
    this.setState({ shortFilms: !this.state.shortFilms });
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
        const arrayAfterdisliked = this.state.moviesArray.map(item => {
          if (card.id === item.id) {
            return {
              ...item,
              liked: false
            }
          }
          return item;
        })
        this.props.likedMoviesRemove(card);
        localStorage.setItem('movies', JSON.stringify({filteredArray: cardsAfterdisliked, moviesNumber: cardsAfterdisliked.length}));
        localStorage.setItem('allMovies', JSON.stringify(arrayAfterdisliked));
        this.setState({ cards: cardsAfterdisliked, moviesArray: arrayAfterdisliked });
      }).catch((err) => {
        console.log(err);
      })
    } else {
      mainApi.postMovie(card.country, card.director, card.duration, card.year, card.description, `http://api.nomoreparties.co${card.image.url}`, card.trailerLink, card.nameRU, card.nameEN, `http://api.nomoreparties.co${card.image.formats.thumbnail.url}`, card.id).then((movie) => {
        const cardsAfterLiked = this.state.cards.map(item => {
          if (card.id === item.id) {
            return {
              ...item,
              liked: true
            }
          }
          return item;
        })

        const arrayAfterLiked = this.state.moviesArray.map(item => {
          if (card.id === item.id) {
            return {
              ...item,
              liked: true
            }
          }
          return item;
        })
        // debugger
        this.props.likedMoviesAdd(movie);
        localStorage.setItem('movies', JSON.stringify({filteredArray: cardsAfterLiked, moviesNumber: cardsAfterLiked.length}));
        localStorage.setItem('allMovies', JSON.stringify(arrayAfterLiked));
        this.setState({ cards: cardsAfterLiked, moviesArray: arrayAfterLiked });
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  render() {
    return (
      <section className="movies" >
        <SearchForm downloadMovies={this.downloadMovies} changeShortFilms={this.changeShortFilms} shortFilms={this.state.shortFilms} />
        <MoviesCardList cards={this.state.cards} changeLike={this.changeLike} deleteButton={false} />
        <Preloader preloaderActive={this.state.preloaderActive} message={this.state.message} />
        <button className={`movies__button ${!this.state.buttonActive ? "movies__button_inactive" : ""}`} onClick={this.moreLoading}>Ещё</button>
      </section>
    )
  }
}
export default Movies;
