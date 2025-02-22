import { GuitarTypeId, GuitarTypes } from "../../constant";
import FilterGuitarStrings from "./filter-guitar-strings";
interface FilterProps {
  selectedTypes: GuitarTypeId[];
  onTypeChange: (selectedTypes: GuitarTypeId[]) => void;
}

function Filter({ onTypeChange, selectedTypes }: FilterProps): JSX.Element {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newSelectedTypes: GuitarTypeId[] = [];

    if (checked) {
      newSelectedTypes = [...selectedTypes, id as GuitarTypeId];
    } else {
      newSelectedTypes = selectedTypes.filter(typeId => typeId !== id);
    }

    onTypeChange(newSelectedTypes);
  }

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {GuitarTypes.map((type) => (
          <div className="form-checkbox catalog-filter__block-item" key={type.id}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={type.id}
              name={type.name}
              checked={selectedTypes.includes(type.id)}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor={type.id}>{type.label}</label>
          </div>
        ))}
      </fieldset>
      <FilterGuitarStrings />
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">
        Очистить
      </button>
    </form>
  );
}

export default Filter;
