import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constant";
import FormGuitarType from "./form-guitar-type";
import FormGuitarStrings from "./form-guitar-strings";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { NewProduct, Product } from "../../types/product";
import dayjs from "dayjs";

type ProductFormProps<T> = {
  product: T;
  onSubmit: (formData: FormData) => void;
};

function ProductForm<T extends Product | NewProduct>({
  product,
  onSubmit,
}: ProductFormProps<T>): JSX.Element {
  const navigate = useNavigate();
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!selectedFile) {
      alert('Пожалуйста, выберите файл.');
      return;
    }
    const form = evt.currentTarget;
    const formData = new FormData(form);
    formData.append('createdAt', product.createdAt.toISOString());
    formData.append('type', String(formData.get('item-type')));
    formData.append('article', String(formData.get('sku')));
    formData.append('stringsCount', String(formData.get('string-qty')));
    onSubmit(formData);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // URL для превью
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0] ? files[0] : null;

    setSelectedFile(file);

    if (file) {
      // Создаем URL для предпросмотра изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string); // Преобразуем reader.result в string
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null); // Очищаем превью, если файл удален
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Очищаем значение input
    }
  };

  return (
    <form className="add-item__form" action="#" method="get" onSubmit={handleFormSubmit}>
      <div className="add-item__form-left">
        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap">
            {previewURL && (
              <img
                src={previewURL}
                srcSet={previewURL}
                alt="Превью изображения"
              //style={{ maxWidth: '100%', maxHeight: '200px' }} // Ограничиваем размеры превью
              />
            )}
          </div>
          <div className="edit-item-image__btn-wrap">
            <button
              className="button button--small button--black-border edit-item-image__btn"
              type="button"
              onClick={handleButtonClick}
            >
              Добавить
            </button>
            <input
              type="file"
              name="photo"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="image/*" // Ограничиваем выбор только изображениями
            />
            <button
              className="button button--small button--black-border edit-item-image__btn"
              onClick={handleRemoveImage}
              type="button"
              disabled={!selectedFile}
            >
              Удалить
            </button>
          </div>
        </div>
        <FormGuitarType />
        <FormGuitarStrings />
      </div>
      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label><span>Дата добавления товара</span>
            <input
              type="text"
              name="date"
              defaultValue={dayjs(product.createdAt).format('DD.MM.YYYY')}
              placeholder="Дата в формате 00.00.0000"
              readOnly
            ></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите наименование товара</span>
            <input
              type="text"
              name="title"
              defaultValue={product.title}
              placeholder="Наименование"
            ></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
          <label><span>Введите цену товара</span>
            <input
              type="text"
              name="price"
              defaultValue={product.price}
              placeholder="Цена в формате 00 000"
            ></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите артикул товара</span>
            <input
              type="text"
              name="sku"
              defaultValue={product.article}
              placeholder="Артикул товара"
            ></input>
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label><span>Введите описание товара</span>
            <textarea
              name="description"
              placeholder=""
              defaultValue={product.description}
            ></textarea>
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
