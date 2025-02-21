import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import ProductForm from "../../components/product-form/product-form";
import { AppRoute } from "../../constant";

function AddProductScreen(): JSX.Element {
  const breadcrumbs = [
    {
      label: 'Вход',
      path: AppRoute.Main
    },
    {
      label: 'Товары',
      path: AppRoute.ProductList
    },
    {
      label: 'Новый товар',
      path: AppRoute.ProductAdd
    },
  ];

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ProductForm />
        </div>
      </section>
    </main>
  );
}

export default AddProductScreen;
