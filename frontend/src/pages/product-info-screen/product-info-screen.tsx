import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";

function ProductInfoScreen(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item" key={1}>
            <Link className="link" to={AppRoute.Main}>Главная</Link>
          </li>
          <li className="breadcrumbs__item" key={2}>
            <Link className="link" to={AppRoute.ProductList}>Каталог</Link>
          </li>
          <li className="breadcrumbs__item" key={3}>
            <Link className="link" to={AppRoute.ProductInfo}>Товар</Link>
          </li>
        </ul>
        <section className="product-container"><img className="product-container__img" src="/img/content/catalog-product-1.png" srcSet="/img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt=""></img>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">СURT Z30 Plus</h2>
            <br></br>
            <br></br>
            <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">SO754565</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">Электрогитара</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">6 струнная</td>
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
