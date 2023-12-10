import { useOutletContext } from 'react-router';
import Filter from './components/Filter/Filter';
import ResultsGrid from './components/ResultsGrid/ResultsGrid';
import './SearchResults.css';
import { useMemo, useState } from 'react';
import SearchResultsService from './services/searchResultsService';
import Card from './components/Card/Card';

import ModalItem from '../../components/ModalItem/ModalItem';

export default function SearchResults() {
  const [results, setResults, input, setInput, setLoading] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [produt, setProdut] = useState({
    nome: '',
    descricao: '',
    imagem: '',
    quantidade_avaliacao: 0,
    nota: 0,
  });

  const paginatedResults = useMemo(() => {
    const pages = SearchResultsService.getGridPages(results);

    console.log('Dados no SearchResults:', results, pages);
    return pages.map((page) =>
      page.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            setProdut(item);
            setOpen(true);
          }}
        >
          <Card product={item} restaurant={item} renderType={'lojas'} />
        </li>
      ))
    );
  }, [results]);

  return (
    <div className="search-results">
      <ModalItem
        product={produt}
        open={open}
        onCloseModal={() => {
          setOpen(false);
        }}
      />
      <Filter
        f={setResults}
        searchInput={input}
        setInput={setInput}
        setLoading={setLoading}
      />
      <ResultsGrid pages={paginatedResults} />
    </div>
  );
}
