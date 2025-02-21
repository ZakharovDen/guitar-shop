import { useParams } from "react-router-dom";
import { AppRoute } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getProductAction } from "../../store/products/thunks";
import { getProductInfo, getProductsDataLoadingStatus } from "../../store/products/selectors";
import Spinner from "../../components/spinner/spinner";
import ErrorScreen from "../error-screen/error-screen";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

function ProductInfoScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProductInfo);
  const isProductLoading = useAppSelector(getProductsDataLoadingStatus);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(getProductAction(id));
    }
  }, [params, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <ErrorScreen />
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
      label: 'Товар',
      path: AppRoute.ProductInfo.replace(':id', product.id)
    },
  ];

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <Breadcrumbs breadcrumbs={breadcrumbs} contentClass={true} />
        <section className="product-container"><img className="product-container__img" src={product?.photoPath} srcSet={product?.photoPath} width="90" height="235" alt=""></img>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{product?.title}</h2>
            <br></br>
            <br></br>
            <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product.article}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{product.type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{`${product.stringsCount} струнная`}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductInfoScreen;
