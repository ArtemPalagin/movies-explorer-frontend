import './SearchForm.css';
import searchImage from '../../images/search-image.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm() {
  return (
    <div className="search-form">
        <form className="search-form__wrapper">
          <input className="search-form__inpute" placeholder="Фильм" type="text" name="search" />
          <button className="search-form__button">
            <img className="search-form__image" src={searchImage} alt="Не получилось загрузить иконку поиска" />
          </button>
        </form>
      <FilterCheckbox />
    </div>
  )
}
export default SearchForm;
