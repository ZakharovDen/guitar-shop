import ProductForm from "../../components/product-form/product-form";

function ProductSaveScreen(): JSX.Element {
  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Новый товар</a>
            </li>
          </ul>
          <ProductForm />
        </div>
      </section>
    </main>
  );
}

export default ProductSaveScreen;
