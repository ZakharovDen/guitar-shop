import { FormEvent, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { loginAction } from "../../store/user/thunks";
import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";
import { UserAuth } from "../../types/user";

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);
    dispatch(loginAction(data));
  };
  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь?
            <Link className="login__link" to={AppRoute.Registration}>Зарегистрируйтесь</Link> прямо сейчас</p>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                ref={loginRef}
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
              >
              </input>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="• • • • • • • • • • • •"
                  id="passwordLogin"
                  name="password"
                  autoComplete="off"
                  required
                >
                </input>

                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Войти</button>
          </form>
        </section>
      </div>
    </main>
  );
}
export default LoginScreen;
