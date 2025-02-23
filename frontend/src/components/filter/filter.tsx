import { GuitarTypeId, GuitarTypes, GuitarStrings, GuitarStringId } from "../../constant";
interface FilterProps {
  selectedTypes: GuitarTypeId[];
  onTypeChange: (selectedTypes: GuitarTypeId[]) => void;
  selectedStrings: GuitarStringId[];
  onStringsChange: (selectedTypes: GuitarStringId[]) => void;
}

function Filter({ onTypeChange, selectedTypes, onStringsChange, selectedStrings }: FilterProps): JSX.Element {

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newSelectedTypes: GuitarTypeId[] = [];

    if (checked) {
      newSelectedTypes = [...selectedTypes, id as GuitarTypeId];
    } else {
      newSelectedTypes = selectedTypes.filter(typeId => typeId !== id);
    }

    onTypeChange(newSelectedTypes);
  }

  const handleStringsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newSelectedStrings: GuitarStringId[] = [];

    if (checked) {
      newSelectedStrings = [...selectedStrings, Number(id) as GuitarStringId];
    } else {
      newSelectedStrings = selectedStrings.filter(stringId => stringId !== Number(id));
    }

    onStringsChange(newSelectedStrings);
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
              onChange={handleTypeChange}
            ></input>
            <label htmlFor={type.id}>{type.label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {GuitarStrings.map((item) => (
          <div className="form-checkbox catalog-filter__block-item" key={item.id}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={item.id.toString()}
              name={item.name}
              checked={selectedStrings.includes(item.id)}
              onChange={handleStringsChange}
            ></input>
            <label htmlFor={item.id.toString()}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">
        Очистить
      </button>
    </form>
  );
}

export default Filter;
