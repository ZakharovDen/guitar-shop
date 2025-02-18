import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constant';
import LoginScreen from '../../pages/login-screen/login-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import ProductListScreen from '../../pages/product-list-screen/product-list-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route
            index
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Registration}
            element={<RegistrationScreen />}
          />
          <Route
            path={AppRoute.ProductList}
            element={<ProductListScreen />}
          />
          <Route
            path={AppRoute.ProductInfo}
            element={<ProductScreen />}
          />
          <Route
            path="*"
            element={<ErrorScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
