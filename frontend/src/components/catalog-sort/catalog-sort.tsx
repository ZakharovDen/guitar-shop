type CatalogSortProps = {
  currentSortBy: string;
  currentSortOrder: 'asc' | 'desc';
  onSortByChange: (sortBy: string) => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
}

function CatalogSort({ currentSortBy, currentSortOrder, onSortByChange, onSortOrderChange }: CatalogSortProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${(currentSortBy === 'createDate') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по дате"
          onClick={() => onSortByChange('createDate')}
        >по дате</button>
        <button
          className={`catalog-sort__type-button ${(currentSortBy === 'price') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick={() => onSortByChange('price')}
        >по цене</button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${(currentSortOrder === 'asc') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={() => onSortOrderChange('asc')}
        ></button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${(currentSortOrder === 'desc') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => onSortOrderChange('desc')}
        ></button>
      </div>
    </div>
  );
}

export default CatalogSort;
