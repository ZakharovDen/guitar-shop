import { Fragment, useState } from "react";
import { GuitarTypeId, GuitarTypes } from "../../constant";

type FormGuitarTypeProps = {
  currentType: GuitarTypeId;
}

function FormGuitarType({ currentType }: FormGuitarTypeProps): JSX.Element {
  const [selectedType, setSelectedType] = useState<GuitarTypeId>(currentType);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedType(id as GuitarTypeId);
    }
  }

  return (
    <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
      {GuitarTypes.map((type) => (
        <Fragment key={type.id}>
          <input
            type="radio"
            id={type.id}
            name="item-type"
            value={type.name}
            checked={(type.id === selectedType)}
            onChange={handleTypeChange}
          ></input>
          <label htmlFor={type.id}>{type.label}</label>
        </Fragment>
      ))}
    </div>
  );
}

export default FormGuitarType;
