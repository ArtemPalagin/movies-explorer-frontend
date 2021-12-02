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
    mainApi.deleteMovie(card.id).then(() => {
      const tryParse = (str) => {
        try {
          return str && JSON.parse(str)
        } catch (e) {
          return null
        }
      }
      const movies = tryParse(localStorage.getItem('movies'))
      const allMovies = tryParse(localStorage.getItem('allMovies'))
      // debugger
      if (movies) {
        const cardsAfterdisliked = movies.filteredArray.map(item => {
          if (card.id === item.id) {

            return {
              ...item,
              liked: false
            }
          }
          return item;
        })
        const arrayAfterdisliked = allMovies.map(item => {
          if (card.id === item.id) {
            return {
              ...item,
              liked: false
            }
          }
          return item;
        })
        localStorage.setItem('movies', JSON.stringify({ filteredArray: cardsAfterdisliked, moviesNumber: cardsAfterdisliked.length }));
        localStorage.setItem('allMovies', JSON.stringify(arrayAfterdisliked));
      }

      const cardsAfterDeletion = this.state.cards.filter((elem) => {
        if (elem.id === card.id) {
          return false;
        } else {
          return true;
        }
      })
      debugger
      this.props.likedMoviesRemove(card);
      this.setState({ cards: cardsAfterDeletion });
      localStorage.setItem('likedMovies', JSON.stringify(cardsAfterDeletion));

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