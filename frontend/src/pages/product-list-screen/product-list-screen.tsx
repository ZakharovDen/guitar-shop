import { useNavigate } from "react-router-dom";
import Catalog from "../../components/catalog/catalog";
import Filter from "../../components/filter/filter";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts } from "../../store/products/selectors";
import { AppRoute } from "../../constant";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useEffect, useState } from "react";
import { fetchProductsAction } from "../../store/products/thunks";
import Pagination from "../../components/pagination/pagination";
import { QueryParams } from "../../types/query-params";

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

function ProductListScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { entities, currentPage, itemsPerPage, totalItems, totalPages } = useAppSelector(getProducts);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>('createDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);

  // Объект с параметрами запроса, который будет передаваться в asyncThunk
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'createDate',
    sortOrder: 'asc',
    category: 'all',
    page: 1,
  });
  useEffect(() => {
    dispatch(fetchProductsAction(queryParams)); // Вызываем action с параметрами запроса
  }, [dispatch, queryParams]); // Зависимость от queryParams

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setQueryParams(prev => ({
      ...prev,
      sortBy: newSortBy,
      //sortOrder: prev.sortBy === newSortBy ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc',
      page: 1
    }));
  };

  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
    setQueryParams(prev => ({
      ...prev,
      sortOrder: newSortOrder,
      page: 1
    }));
  };

  const handleFilterCategoryChange = (newCategory: string) => {
    setFilterCategory(newCategory);
    setQueryParams(prev => ({
      ...prev,
      category: newCategory,
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setQueryParams(prev => ({
      ...prev,
      page: newPage
    }));
  }

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
                  className={`catalog-sort__type-button ${(sortBy === 'createDate') ? 'catalog-sort__type-button--active' : ''}`}
                  aria-label="по дате"
                  onClick={() => handleSortByChange('createDate')}
                >по дате</button>
                <button
                  className={`catalog-sort__type-button ${(sortBy === 'price') ? 'catalog-sort__type-button--active' : ''}`}
                  aria-label="по цене"
                  onClick={() => handleSortByChange('price')}
                >по цене</button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${(sortOrder === 'asc') ? 'catalog-sort__order-button--active' : ''}`}
                  aria-label="По возрастанию"
                  onClick={() => handleSortOrderChange('asc')}
                ></button>
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${(sortOrder === 'desc') ? 'catalog-sort__order-button--active' : ''}`}
                  aria-label="По убыванию"
                  onClick={() => handleSortOrderChange('desc')}
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
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
        </div>
      </section>
    </main>
  );
}

export default ProductListScreen;
