import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import ProductForm from "../../components/product-form/product-form";
import { AppRoute } from "../../constant";
import { useAppDispatch } from "../../hooks";
import { postProductAction } from "../../store/products/thunks";
import { NewProduct } from "../../types/product";

function AddProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
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

  const emptyProduct: NewProduct = {
    title: '',
    description: '',
    createdAt: new Date(),
    type: 'electro',
    article: '',
    stringsCount: 4,
    price: 0,
    photoPath: ''
  }

  const handleFormSubmit = (formData: FormData) => {
    dispatch(postProductAction(formData));
  };

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ProductForm onSubmit={handleFormSubmit} product={emptyProduct} />
        </div>
      </section>
    </main>
  );
}

export default AddProductScreen;
