import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import SearchResults from './views/SearchResults/SearchResults';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [{ path: 'search', element: <SearchResults /> }],
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
