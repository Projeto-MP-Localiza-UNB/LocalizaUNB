import { useState } from 'react';
import { useNavigate } from 'react-router';

import Error from '../../shared/error/Error';

import './Search.css';
import icon_search from '../../assets/icons/icone-lupa.png';

export function Search({ setter }) {
  const [hasErrors, setHasErrors] = useState({ searchInput: null });
  const navigate = useNavigate();

  function validateForm(searchInput) {
    const searchInputRegexp = /^.{1,}$/;

    return {
      searchInput: !searchInputRegexp.test(searchInput),
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const errors = validateForm(data.searchInput);
    setHasErrors(errors);
    if (!Object.values(errors).includes(true)) {
      const mock = [];
      for (let i = 0; i < 14; i++) {
        mock.push({
          id: i + 1,
          store: {
            name: `LOJA ${i}`,
            review: (Math.random() * 5).toFixed(1),
            meters: (Math.random() * 100).toFixed(2),
          },
        });
      }
      console.log(typeof setter);
      setter(mock);
      navigate('/search');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="search-form"
    >
      <div className="field_form_child">
        <input
          type="text"
          placeholder="Digite aqui o que você deseja..."
          id="searchInput"
          name="searchInput"
          className={hasErrors.searchInput ? '' : ''}
        />
        <button onSubmit={handleSubmit}>
          <img src={icon_search} alt="lupa" width={40} />
        </button>
      </div>
      <Error
        className="error"
        show={hasErrors.searchInput}
        message="Este campo não pode ser vazio!"
      />
    </form>
  );
}
