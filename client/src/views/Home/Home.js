import React from 'react';
import '../Home/Home.css';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Search } from '../../shared/search/Search';
import Loading from '../../shared/loading/Loading';

const Home = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  return (
    <>
      <main>
        <Loading status={loading} />
        {location.pathname === '/' ? (
          <div className="main_container">
            <h1>Encontre no Localiza UnB</h1>
            <p>
              Busque o que deseja comprar e nós localizaremos as lojas mais
              próximas de você
            </p>
            <div>
              <Search
                setter={setResults}
                input={setInput}
                loading={setLoading}
              />
            </div>
          </div>
        ) : (
          <Outlet
            context={[results, setResults, input, setInput, setLoading]}
          />
        )}
      </main>
    </>
  );
};

export default Home;
