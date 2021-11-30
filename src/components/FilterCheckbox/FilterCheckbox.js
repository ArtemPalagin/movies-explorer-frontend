import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <p className="filter-checkbox__text">Короткометражки</p>
      <div className="filter-checkbox__switch">
        <input className="filter-checkbox__switch-checkbox" type="checkbox" name="switcher" />
      </div>
    </div>
  )
}
export default FilterCheckbox;