import './SearchForm.css';
import searchImage from '../../images/search-image.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__wrapper">
        <input className="search-form__inpute" placeholder="Фильм" type="text" name="search" />
        <img className="search-form__image" src={searchImage} alt="Не получилось загрузить иконку поиска" />
      </div>
      <FilterCheckbox />
    </div>
  )
}
export default SearchForm;