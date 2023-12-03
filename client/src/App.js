import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const path = useLocation().pathname;

  return (
    <>
      {!['/login', '/register', '/seller-register'].includes(path) ? (
        <Header />
      ) : null}
      <Outlet />
    </>
  );
}

export default App;
