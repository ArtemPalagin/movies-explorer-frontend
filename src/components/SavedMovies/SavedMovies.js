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

  componentDidMount() {
    mainApi.getMovies().then((movies) => {
      this.setState({ moviesArray: movies });
    }).cards((err) => {
      console.log(err);
    })
  }
  reload = () => {
    mainApi.getMovies().then((movies) => {
      this.setState({ moviesArray: movies });
    }).cards((err) => {
      console.log(err);
    })
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
    mainApi.deleteMovie(card).then(() => {
      const arrayAfterDeletion = this.state.moviesArray.filter((elem) => {
        if (elem.id === card.id) {
          return false;
        } else {
          return true;
        }
      })
      const cardsAfterDeletion = this.state.cards.filter((elem) => {
        if (elem.id === card.id) {
          return false;
        } else {
          return true;
        }
      })
      this.setState({ moviesArray: arrayAfterDeletion, cards: cardsAfterDeletion });
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