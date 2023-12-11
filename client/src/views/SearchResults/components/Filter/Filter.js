import { useState } from 'react';
import { Search } from '../../../../shared/search/Search';

import './Filter.css';

/**
 * Componente do filtro da página de apresentação de resultados. Constitui o cabeçalho dessa página.
 * @param {function} setResults Função para definir o estado dos resultados
 * @param {string} searchInput Entrada do usuário no campo de pesquisa
 * @param {function} setInput Função para definir o estado da entrada
 * @param {function} setLoading Função para definir o estado do componente de carregamento
 * @returns
 */
export default function Filter({
  setResults,
  searchInput,
  setInput,
  setLoading,
}) {
  const [type, setType] = useState('produto');
  return (
    <div className="filter-container">
      <p>
        Buscando por <span>{searchInput}</span>
      </p>
      <Search setter={setResults} input={setInput} loading={setLoading} />
      <div className="sort">
        <div className="options">
          <button onClick={() => setType('produto')}>Pesquisa</button>
          <button onClick={() => setType('loja')}>Lojas</button>
          <svg width="100%" height="5" className={['sign', type].join(' ')}>
            <rect x="0" y="0" width="100%" height="5" rx="5" fill="#3265A2" />
          </svg>
        </div>
      </div>
      <svg width="100%" height="2.5">
        <rect x="0" y="0" width="100%" height="2.5" rx="5" fill="#D9D9D9" />
      </svg>
    </div>
  );
}
