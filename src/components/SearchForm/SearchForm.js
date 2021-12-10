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
  componentDidMount(){
    this.setState({ text: this.props.keyWord});
  }
  textChange = (e) => {
    this.setState({ text: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.downloadMovies(this.state.text);
  }
  
  render() {
    return (
      <div className="search-form" >
        <form className="search-form__wrapper" onSubmit={this.handleSubmit}>
          <input className="search-form__inpute" onChange={this.textChange} placeholder="Фильм" type="text" name="search" />
          <button className="search-form__button">
            <p className="search-form__image" src={searchImage} alt="Не получилось загрузить иконку поиска">Поиск</p>
          </button>
        </form>
        <FilterCheckbox changeShortFilms={this.props.changeShortFilms} shortFilms={this.props.shortFilms} />
      </div>
    )
  }
}
export default SearchForm;