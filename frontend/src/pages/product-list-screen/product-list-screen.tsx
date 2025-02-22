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
import CatalogSort from "../../components/catalog-sort/catalog-sort";

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
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Объект с параметрами запроса, который будет передаваться в asyncThunk
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'createDate',
    sortOrder: 'asc',
    category: '',
    page: 1,
  });
  useEffect(() => {
    dispatch(fetchProductsAction(queryParams));
  }, [dispatch, queryParams]);

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setQueryParams(prev => ({
      ...prev,
      sortBy: newSortBy,
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
            <CatalogSort
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
            />
            <Catalog products={entities} />
          </div>
          <button
            className="button product-list__button button--red button--big"
            onClick={() => { navigate(AppRoute.ProductAdd) }}
          >Добавить новый товар
          </button>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </main>
  );
}

export default ProductListScreen;
