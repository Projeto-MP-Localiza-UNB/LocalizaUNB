import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * Função que representa o componente principal da aplicação.
 *
 * @returns O componente App.
 */
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
