import React from 'react';
import '../Home/Home.css';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Search } from '../../shared/search/Search';

const Home = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  return (
    <>
      <main>
        {location.pathname === '/' ? (
          <div className="main_container">
            <h1>Encontre no Localiza UnB</h1>
            <p>
              Busque o que deseja comprar e nós localizaremos as lojas mais
              próximas de você
            </p>
            <div>
              <Search setter={setResults} />
            </div>
          </div>
        ) : (
          <Outlet context={[results, setResults]} />
        )}
      </main>
    </>
  );
};

export default Home;
