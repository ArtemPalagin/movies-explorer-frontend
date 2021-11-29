import React from 'react';
import './SearchForm.css';
import searchImage from '../../images/search-image.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }
  textChange = (e) => {
    this.setState({ text: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({ text: "" });
//    e.target.reset();
    this.props.downloadMovies(this.state.text);
    // console.log(MoviesFilter(this.props.cards ,this.state.text));
    // localStorage.setItem('token', data.token);
  }
  render() {
    return (
      <div className="search-form" >
        <form className="search-form__wrapper" onSubmit={this.handleSubmit}>
          <input className="search-form__inpute" onChange={this.textChange} placeholder="Фильм" type="text" name="search" />
          <button className="search-form__button">
            <img className="search-form__image" src={searchImage} alt="Не получилось загрузить иконку поиска" />
          </button>
        </form>
        <FilterCheckbox changeShortFilms={this.props.changeShortFilms} />
      </div>
    )
  }
}
export default SearchForm;