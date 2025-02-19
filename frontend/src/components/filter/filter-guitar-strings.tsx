import { GuitarStrings } from "../../constant";

function FilterGuitarStrings(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {GuitarStrings.map((item) => (
        <div className="form-checkbox catalog-filter__block-item" key={item.id}>
          <input className="visually-hidden" type="checkbox" id={item.id} name={item.name}></input>
          <label htmlFor={item.id}>{item.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterGuitarStrings;