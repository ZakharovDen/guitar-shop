import { FormEvent } from "react";
import { useAppDispatch } from "../../hooks";
import { UserRegister } from "../../types/user";
import { registerAction } from "../../store/user/thunks";

function RegistrationScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;

    const formData = new FormData(form) as Iterable<[UserRegister]>;
    const data = Object.fromEntries(formData);

    dispatch(registerAction(data));
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input type="text" id="name" name="name" autoComplete="off" required></input>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input type="email" id="email" name="email" autoComplete="off" required></input>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label><span>
                <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required></input>
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button></span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default RegistrationScreen;
