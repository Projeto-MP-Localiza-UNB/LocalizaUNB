import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import SearchResults from './views/SearchResults/SearchResults';
import SellerRegister from './views/SellerRegister/SellerRegister';
import ErrorPage from './views/ErrorPage/ErrorPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [{ path: 'search', element: <SearchResults /> }],
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'seller-register', element: <SellerRegister /> },
    ],
  },
]);
