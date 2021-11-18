import { FilterCheckbox } from 'react-router-dom';
import searchImage from '../../images/searchImage.svg';

function SearchForm(props){
  return(
    <section className="search-form">
      <div className="search-form__input-wrapper">
        <FilterCheckbox className="search-form__imput"></FilterCheckbox>
        <button className="search-form__button">
          <img className="search-form__image" src={searchImage} alt="Не получислось загрузить изображение кнопки поиска" />
        </button>
      </div>
      <div className="search-form__filter">
        <p className="search-form__filter-text">Короткометражки</p>
        <div className="search-form__switch">
          <button className="search-form__switch-button"></button>
        </div>
      </div>
    </section>
  )
}
export default SearchForm;