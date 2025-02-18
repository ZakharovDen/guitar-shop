import FilterGuitarStringsCount from "./filter-guitar-strings-count";
import FilterGuitarType from "./filter-guitar-type";

function Filter(): JSX.Element {
  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterGuitarType />
      <FilterGuitarStringsCount />
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default Filter;
