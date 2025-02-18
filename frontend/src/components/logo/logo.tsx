import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";

function Logo(): JSX.Element {
  return (
    <Link className="header__logo logo" to={AppRoute.Main}>
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"></img>
    </Link>
  );
}

export default Logo;