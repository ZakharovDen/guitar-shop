import { useNavigate } from "react-router-dom";
import Catalog from "../../components/catalog/catalog";
import Filter from "../../components/filter/filter";
import { useAppSelector } from "../../hooks";
import { getProducts } from "../../store/products/selectors";
import { AppRoute } from "../../constant";

function ProductListScreen(): JSX.Element {
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <Filter />
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
                <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
              </div>
            </div>
            <Catalog products={products} />
          </div>
          <button
            className="button product-list__button button--red button--big"
            onClick={() => { navigate(AppRoute.ProductAdd) }}
          >Добавить новый товар
          </button>
          <div className="pagination product-list__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
              </li>
              <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductListScreen;
