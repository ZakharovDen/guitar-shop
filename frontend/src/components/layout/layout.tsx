import { Link, Outlet } from "react-router-dom";
import { AppRoute } from "../../constant";
import Logo from "../logo/logo";

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item"><Link className="link main-nav__link" to={AppRoute.ProductList}>Каталог</Link>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
                </li>
              </ul>
            </nav>
            <div className="header__container"><span className="header__user-name">Имя</span><Link className="header__link" to={AppRoute.Main} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span></Link></div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="container">
          <div className="footer__container">
            <div className="footer__logo-wrapper">
              <Logo />
              <div className="socials footer__socials">
                <ul className="socials__list">
                  <li className="socials-item"><a className="socials__link" href="https://www.skype.com/" aria-label="Мы в skype">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-skype"></use>
                    </svg></a></li>
                  <li className="socials-item"><a className="socials__link" href="https://www.vsco.co/" aria-label="Мы в vsco">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-vsco"></use>
                    </svg></a></li>
                  <li className="socials-item"><a className="socials__link" href="https://www.pinterest.com/" aria-label="Мы в pinterest">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-pinterest"></use>
                    </svg></a></li>
                </ul>
              </div>
            </div>
            <section className="footer__nav-section footer__nav-section--about">
              <h2 className="footer__nav-title footer__nav-title--about">О нас</h2>
              <p className="footer__nav-text footer__nav-text--about">Магазин гитар, музыкальных <br /> инструментов и&nbsp;гитарная мастерская в&nbsp;Санкт-Петербурге.</p>
              <p className="footer__nav-text footer__nav-text--about">Все инструменты проверены, отстроены и&nbsp;доведены до&nbsp;идеала!</p>
            </section>
            <section className="footer__nav-section footer__nav-section--links">
              <h2 className="footer__nav-title footer__nav-title--links">Информация</h2>
              <ul className="footer__nav-list">
                <li className="footer__nav-list-item"><a className="link footer__nav-link" href="#top">Где купить?</a>
                </li>
                <li className="footer__nav-list-item"><a className="link footer__nav-link" href="#top">Блог</a>
                </li>
                <li className="footer__nav-list-item"><a className="link footer__nav-link" href="#top">Вопрос - ответ</a>
                </li>
                <li className="footer__nav-list-item"><a className="link footer__nav-link" href="#top">Возврат</a>
                </li>
                <li className="footer__nav-list-item"><a className="link footer__nav-link" href="#top">Сервис-центры</a>
                </li>
              </ul>
            </section>
            <section className="footer__nav-section footer__nav-section--contacts">
              <h2 className="footer__nav-title footer__nav-title--contacts">Контакты</h2>
              <p className="footer__nav-text footer__nav-text--address">г. Санкт-Петербург,<br /> м. Невский проспект, ул. Казанская 6.</p><a className="link footer__nav-link footer__nav-link--phone" href="tel:88125005050">8-812-500-50-50</a>
              <p className="footer__nav-text footer__nav-text--work-hours-title">Режим работы:<span className="footer__nav-text footer__nav-text--work-hours">с 11:00 до 20:00</span></p>
              <p className="footer__nav-text footer__nav-text--weekends">без выходных</p>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
