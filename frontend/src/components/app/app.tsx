import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constant';
import LoginScreen from '../../pages/login-screen/login-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<LoginScreen />}
        />
        <Route
          path="*"
          element={<ErrorScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
