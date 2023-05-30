import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import HistoryRouter from '../history-router/history-router';

import { browserHistory } from '../../services/browser-history';
import { getAuthStatus } from '../../store/user/selectors';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import PrivateRoute from '../../hocs/private-route';
import { AppRoute } from '../../utils/const/const';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';

export default function App() {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus.unknown) {
    return <LoadingSpinner spinnerType='page' />;
  }

  return (
    <HistoryRouter history={browserHistory} >
      <Routes>
        <Route
          path={AppRoute.Login}
          element={
            <Login />
          }
        />
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
      </Routes>
    </HistoryRouter>
  );
}
