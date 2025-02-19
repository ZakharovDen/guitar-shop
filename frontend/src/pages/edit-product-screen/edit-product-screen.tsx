import ProductForm from "../../components/product-form/product-form";

function EditProductScreen(): JSX.Element {
  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">СURT Z30 Plus</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">СURT Z30 Plus</a>
            </li>
          </ul>
          <ProductForm />
        </div>
      </section>
    </main>
  );
}

export default EditProductScreen;
