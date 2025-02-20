import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';
import LoginScreen from '../../pages/login-screen/login-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import ProductListScreen from '../../pages/product-list-screen/product-list-screen';
import ProductInfoScreen from '../../pages/product-info-screen/product-info-screen';
import Layout from '../layout/layout';
import AddProductScreen from '../../pages/add-product-screen/add-product-screen';
import EditProductScreen from '../../pages/edit-product-screen/edit-product-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route index element={<LoginScreen />} />
          <Route
            path={AppRoute.ProductAdd}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Main}>
                <AddProductScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.ProductEdit}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Main}>
                <EditProductScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Registration}
            element={
              //<PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.ProductList}>
              <RegistrationScreen />
              //</PrivateRoute>
            }
          />
          <Route
            path={AppRoute.ProductList}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Main}>
                <ProductListScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.ProductInfo}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Main}>
                <ProductInfoScreen />
              </PrivateRoute>
            }
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
