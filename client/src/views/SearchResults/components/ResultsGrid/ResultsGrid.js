import './ResultsGrid.css';
import leftArrow from '../../../../assets/icons/left-chevron-svgrepo-com.svg';
import rightArrow from '../../../../assets/icons/right-chevron-svgrepo-com.svg';
import { useReducer, useRef } from 'react';

function reducer(state, action) {
  switch (action) {
    case 'back':
      return state - 1;
    case 'forward':
      return state + 1;
    default: {
      return state;
    }
  }
}

export default function ResultsGrid({ pages }) {
  const [index, dispatch] = useReducer(reducer, 0);
  const grid = useRef();

  // Function to configure smooth transition between pages
  function gridTransition(action) {
    const showDirection = action === 'forward' ? 'right' : 'left';
    const hideDirection = action === 'forward' ? 'left' : 'right';

    grid.current.classList.add(`hide-${hideDirection}`);
    setTimeout(() => {
      dispatch(action);
      grid.current.classList.remove(`hide-${hideDirection}`);
      grid.current.classList.add(`show-${showDirection}`);
      setTimeout(() => {
        grid.current.classList.remove(`show-${showDirection}`);
      }, 250);
    }, 250);
  }

  return (
    <>
      <div className="grid-container">
        <button
          className="grid-paginator-back"
          onClick={() => gridTransition('back')}
          disabled={!index}
        >
          <img src={leftArrow} alt="ícone de seta para a esquerda" />
        </button>
        <ul ref={grid} className="results-grid">
          {pages[index]}
        </ul>
        <button
          className="grid-paginator-forward"
          onClick={() => gridTransition('forward')}
          disabled={index === pages.length - 1}
        >
          <img src={rightArrow} alt="ícone de seta para a esquerda" />
        </button>
      </div>
    </>
  );
}
