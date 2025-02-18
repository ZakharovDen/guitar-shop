import { GuitarTypes } from "../../constant";

function FormGuitarType(): JSX.Element {
  return (
    <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
      {GuitarTypes.map((type) => (
        <>
          <input type="radio" id={type.id} name="item-type" value={type.name}></input>
          <label htmlFor={type.id}>{type.label}</label>
        </>
      ))}
    </div>
  );
}

export default FormGuitarType;
