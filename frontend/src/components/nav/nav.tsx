import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getAuthorizationStatus } from "../../store/user/selectors";
import { AppRoute } from "../../constant";

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus) {
    return (
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item"><Link className="link main-nav__link" to={AppRoute.Main}>Каталог</Link>
          </li>
          <li className="main-nav__item"><Link className="link main-nav__link" to={AppRoute.Main}>Список товаров</Link>
          </li>
        </ul>
      </nav>
    )
  }
  else {
    return (
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item"><Link className="link main-nav__link" to={AppRoute.Main}>Каталог</Link>
          </li>
          <li className="main-nav__item"><Link className="link main-nav__link" to="#">Где купить?</Link>
          </li>
          <li className="main-nav__item"><Link className="link main-nav__link" to="#">О компании</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
