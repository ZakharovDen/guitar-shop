import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import ProductForm from "../../components/product-form/product-form";
import { AppRoute } from "../../constant";

function EditProductScreen(): JSX.Element {
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
      label: 'Название товара!!!',
      path: AppRoute.ProductEdit.replace(':id', /*product.id*/'123')
    },
  ];

  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">СURT Z30 Plus</h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ProductForm />
        </div>
      </section>
    </main>
  );
}

export default EditProductScreen;
