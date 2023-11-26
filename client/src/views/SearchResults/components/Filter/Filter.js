import { useState } from 'react';
import { Search } from '../../../../shared/search/Search';

import './Filter.css';

export default function Filter({ f, searchInput, setInput }) {
  const [type, setType] = useState('produto');
  return (
    <div className="filter-container">
      <p>
        Buscando por <span>{searchInput}</span>
      </p>
      <Search setter={f} input={setInput} />
      <div className="sort">
        <div className="options">
          <button onClick={() => setType('produto')}>Produtos</button>
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
