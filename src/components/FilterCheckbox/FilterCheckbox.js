import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__switch" onClick={props.changeShortFilms}>
        <input className={`filter-checkbox__switch-checkbox ${ props.shortFilms ? "filter-checkbox__switch-checkbox_active" : ""}`} type="checkbox" name="switcher" />
      </div>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  )
}
export default FilterCheckbox;