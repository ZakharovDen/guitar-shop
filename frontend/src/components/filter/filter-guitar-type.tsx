import { GuitarTypes } from "../../constant";

function FilterGuitarType(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {GuitarTypes.map((type) => (
        <div className="form-checkbox catalog-filter__block-item" key={type.id}>
          <input className="visually-hidden" type="checkbox" id={type.id} name={type.name}></input>
          <label htmlFor={type.id}>{type.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterGuitarType;
