import { useOutletContext } from 'react-router';
import Filter from './components/Filter/Filter';
import ResultsGrid from './components/ResultsGrid/ResultsGrid';
import './SearchResults.css';
import { useMemo } from 'react';
import SearchResultsService from './services/searchResultsService';
import Card from './components/Card/Card';


export default function SearchResults() {
  const [results, setResults, input, setInput, setLoading] = useOutletContext();
  

  const paginatedResults = useMemo(() => {
    const pages = SearchResultsService.getGridPages(results);
    console.log("Dados no SearchResults:", results);
    return pages.map((page) =>
      page.map((item) => (
        
        <li key={item.id}>
          
          <Card product={item} renderType={'lojas' }/>

        </li>
      ))
    );
  }, [results]);

  return (
    <div className="search-results">
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
