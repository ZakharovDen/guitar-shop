import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import ProductForm from "../../components/product-form/product-form";
import { AppRoute } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductInfo, getProductsDataLoadingStatus } from "../../store/products/selectors";
import { useEffect } from "react";
import { editProductAction, getProductAction } from "../../store/products/thunks";
import Spinner from "../../components/spinner/spinner";
import ErrorScreen from "../error-screen/error-screen";

function EditProductScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isProductLoading = useAppSelector(getProductsDataLoadingStatus);
  const product = useAppSelector(getProductInfo);
  const { id } = params;

  useEffect(() => {
    if (id) {
      dispatch(getProductAction(id));
    }
  }, [params, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <ErrorScreen />;
  }

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
      label: product.title,
      path: ''
    },
  ];

  const handleFormSubmit = (formData: FormData) => {
    dispatch(editProductAction(formData));
  };

  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">{product.title}</h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ProductForm onSubmit={handleFormSubmit} product={product} />
        </div>
      </section>
    </main>
  );
}

export default EditProductScreen;
