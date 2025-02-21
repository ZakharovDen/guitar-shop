import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";
import Logo from "../logo/logo";
import Nav from "../nav/nav";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../store/user/selectors";

function Header(): JSX.Element {
  const user = useAppSelector(getUser);
  return (
    <header className={`${user ? 'header--admin' : ''} header`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <Nav />
          <div className="header__container">
            <span className="header__user-name">{user?.name ?? 'Имя'}</span>
            <Link className="header__link" to={AppRoute.Main} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg><span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
