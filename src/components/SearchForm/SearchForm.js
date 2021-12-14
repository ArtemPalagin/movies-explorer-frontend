import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }
  componentDidMount() {
    this.setState({ text: this.props.keyWord || '' });
    // debugger
  }
  componentDidUpdate(prevProps) {
    if (prevProps.keyWord === this.props.keyWord) {
      return
    }

    this.setState({
      text: this.props.keyWord || ''
    })
  }
  changeText = (e) => {
    this.setState({ text: e.target.value });
    // debugger
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.text.length){
      return
    }
    if (this.props.searchSubmit) {
      this.props.searchSubmit();
    }
    this.props.downloadMovies(this.state.text);
  }

  render() {
    return (
      <div className="search-form" >
        <form className="search-form__wrapper" onSubmit={this.handleSubmit}>
          <input className="search-form__inpute" value={this.state.text} onChange={this.changeText} placeholder="Фильм" type="text" name="search" />
          <button className={`search-form__button ${ this.state.text.length ? "" : "search-form__button_invaled"}`}>Поиск</button>
        </form>
        <FilterCheckbox changeShortFilms={this.props.changeShortFilms} shortFilms={this.props.shortFilms} />
      </div>
    )
  }
}
export default SearchForm;