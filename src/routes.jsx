import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { getItem } from './utils/storage';

import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Main from './Pages/Main';
import GlobalProvider from './contexts/GlobalContext';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MyRoutes() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<ProtectedRoutes redirectTo={'/'} />}>
            <Route path="/main" element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default MyRoutes;
