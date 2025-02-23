import { Fragment, useState } from "react";
import { GuitarStringId, GuitarStrings } from "../../constant";

type FormGuitarStringsProps = {
  currentStrings: GuitarStringId;
}

function FormGuitarStrings({ currentStrings }: FormGuitarStringsProps): JSX.Element {
  const [selectedStrings, setSelectedStrings] = useState<GuitarStringId>(currentStrings);

  const handleStringsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedStrings(Number(id) as GuitarStringId);
    }
  }
  return (
    <div className="input-radio add-item__form-radio"><span>Количество струн</span>
      {GuitarStrings.map((item) => (
        <Fragment key={item.id}>
          <input
            type="radio"
            id={item.id.toString()}
            name="string-qty"
            value={item.label}
            checked={(item.id === selectedStrings)}
            onChange={handleStringsChange}
          ></input>
          <label htmlFor={item.id.toString()}>{item.label}</label>
        </Fragment>
      ))}
    </div>
  );
}

export default FormGuitarStrings;
