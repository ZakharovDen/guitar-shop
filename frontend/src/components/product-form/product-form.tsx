import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constant";
import FormGuitarType from "./form-guitar-type";
import FormGuitarStrings from "./form-guitar-strings";

function ProductForm(): JSX.Element {
  const navigate = useNavigate();

  return (
    <form className="add-item__form" action="#" method="get">
      <div className="add-item__form-left">
        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap">
          </div>
          <div className="edit-item-image__btn-wrap">
            <button className="button button--small button--black-border edit-item-image__btn">Добавить
            </button>
            <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
          </div>
        </div>
        <FormGuitarType />
        <FormGuitarStrings />
      </div>
      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label><span>Дата добавления товара</span>
            <input type="text" name="date" value="" placeholder="Дата в формате 00.00.0000" readOnly></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите наименование товара</span>
            <input type="text" name="title" value="" placeholder="Наименование"></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
          <label><span>Введите цену товара</span>
            <input type="text" name="price" value="" placeholder="Цена в формате 00 000"></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите артикул товара</span>
            <input type="text" name="sku" value="" placeholder="Артикул товара"></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label><span>Введите описание товара</span>
            <textarea name="description" placeholder=""></textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="add-item__form-buttons-wrap">
        <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
        <button
          className="button button--small add-item__form-button"
          type="button"
          onClick={() => { navigate(AppRoute.ProductList) }}
        >
          Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
