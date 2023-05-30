import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store/store';
import { checkAuthStatus } from './store/user/api-actions';
import App from './components/app/app';
import { getId, getToken } from './services/token';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthStatus({ id: getId(), token: getToken() }));

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      <App />
    </Provider>
  </StrictMode>
);
