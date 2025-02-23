import { Link } from "react-router-dom";
import { Product } from "../../types/product";
import { AppRoute } from "../../constant";
import { deleteProductAction } from "../../store/products/thunks";
import { useAppDispatch } from "../../hooks";
import dayjs from "dayjs";

type CatalogItemProps = {
  product: Product;
}

function CatalogItem({ product }: CatalogItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const linkToInfo = AppRoute.ProductInfo.replace(':id', product.id);
  const linkToEdit = AppRoute.ProductEdit.replace(':id', product.id);
  const handleButtonClick = () => {
    dispatch(deleteProductAction(product.id));
  };
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={product.photoPath}
          srcSet="img/content/catalog-product-1@2x.png 2x"
          width="36"
          height="93"
          alt="Картинка гитары"
        ></img>
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={linkToInfo}>
            <p className="catalog-item__data-title">{product.title}</p>
          </Link>
          <br></br>
          <p className="catalog-item__data-date">{`Дата добавления ${dayjs(product.createdAt).format('DD.MM.YYYY')}`}</p>
          <p className="catalog-item__data-price">{`${product.price} ₽`}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to={linkToEdit}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
          onClick={handleButtonClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default CatalogItem;
