import { Fragment } from "react";
import { GuitarStrings } from "../../constant";

function FormGuitarStrings(): JSX.Element {
  return (
    <div className="input-radio add-item__form-radio"><span>Количество струн</span>
      {GuitarStrings.map((item) => (
        <Fragment key={item.id}>
          <input type="radio" id={item.id} name="string-qty" value={item.label}></input>
          <label htmlFor={item.id}>{item.label}</label>
        </Fragment>
      ))}
    </div>
  );
}

export default FormGuitarStrings;
