import { Products } from "../../types/product";
import CatalogItem from "../catalog-item/catalog-item";

type CatalogProps = {
  products: Products;
}

function Catalog({ products }: CatalogProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {products.map((product) => (
          <CatalogItem product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}

export default Catalog;
