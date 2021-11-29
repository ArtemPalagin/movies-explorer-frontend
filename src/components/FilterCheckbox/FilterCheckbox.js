import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <p className="filter-checkbox__text">Короткометражки</p>
      <div className="filter-checkbox__switch" onClick={props.changeShortFilms}>
        <input className="filter-checkbox__switch-checkbox" type="checkbox" name="switcher" />
      </div>
    </div>
  )
}
export default FilterCheckbox;