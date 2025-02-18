import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { checkAuthAction } from './store/user/thunks';
import { fetchProductsAction } from './store/products/thunks';
import { Provider } from 'react-redux';

store.dispatch(checkAuthAction());
store.dispatch(fetchProductsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      < App />
    </Provider>
  </React.StrictMode>
);
