import { useNavigate } from "react-router-dom";
import Catalog from "../../components/catalog/catalog";
import Filter from "../../components/filter/filter";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts } from "../../store/products/selectors";
import { AppRoute } from "../../constant";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useEffect, useState } from "react";
import { fetchProductsAction } from "../../store/products/thunks";

const breadcrumbs = [
  {
    label: 'Вход',
    path: AppRoute.Main
  },
  {
    label: 'Товары',
    path: AppRoute.ProductList
  },
];
interface QueryParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  category: string;
  page: number;
}

function ProductListScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { entities, currentPage, itemsPerPage, totalItems, totalPages } = useAppSelector(getProducts);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  // Объект с параметрами запроса, который будет передаваться в asyncThunk
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'name',
    sortOrder: 'asc',
    category: 'all',
    page: 1,
  });
  useEffect(() => {
    dispatch(fetchProductsAction(queryParams)); // Вызываем action с параметрами запроса
  }, [dispatch, queryParams]); // Зависимость от queryParams

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    // Обновляем параметры запроса. Сортировку и фильтрацию применяем на бэке.
    setQueryParams(prev => ({
      ...prev,
      sortBy: newSortBy,
      sortOrder: prev.sortBy === newSortBy ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc', //Переключаем порядок, если нажата та же кнопка.
      page: 1 //При смене сортировки возвращаемся на первую страницу
    }));
  };

  const handleFilterCategoryChange = (newCategory: string) => {
    setFilterCategory(newCategory);
    // Обновляем параметры запроса
    setQueryParams(prev => ({
      ...prev,
      category: newCategory,
      page: 1 //При смене фильтра возвращаемся на первую страницу
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setQueryParams(prev => ({
      ...prev,
      page: newPage
    }));
  }

  //Генерируем массив номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className="catalog">
            <Filter />
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className="catalog-sort__type-button catalog-sort__type-button--active"
                  aria-label="по цене"
                >по дате</button>
                <button
                  className="catalog-sort__type-button"
                  aria-label="по цене"
                >по цене</button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className="catalog-sort__order-button catalog-sort__order-button--up"
                  aria-label="По возрастанию"
                ></button>
                <button
                  className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active"
                  aria-label="По убыванию"
                ></button>
              </div>
            </div>
            <Catalog products={entities} />
          </div>
          <button
            className="button product-list__button button--red button--big"
            onClick={() => { navigate(AppRoute.ProductAdd) }}
          >Добавить новый товар
          </button>
          <div className="pagination product-list__pagination">
            <ul className="pagination__list">
              {pageNumbers.map(pageNumber => (
                <li
                  key={pageNumber}
                  className={`pagination__page ${page === pageNumber ? 'pagination__page--active' : ''}`}
                >
                  <a
                    className="link pagination__page-link"
                    href={`#${pageNumber}`} //Использовать react-router link вместо <a>, если используете роутинг.
                    onClick={(e) => {
                      e.preventDefault(); // Предотвращаем переход по ссылке
                      handlePageChange(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </a>
                </li>
              ))}
              <li className="pagination__page pagination__page--next" id="next">
                <a
                  className="link pagination__page-link"
                  href={`#${page + 1}`}  //Использовать react-router link вместо <a>, если используете роутинг.
                  onClick={(e) => {
                    e.preventDefault(); // Предотвращаем переход по ссылке
                    if (page < totalPages) {
                      handlePageChange(page + 1);
                    }
                  }}
                >
                  Далее
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductListScreen;
