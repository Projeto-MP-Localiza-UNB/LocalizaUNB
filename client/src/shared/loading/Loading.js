import loading from './assets/Ripple-1s-200px.svg';
import './Loading.css';

export default function Loading({ status, message = '' }) {
  return (
    <>
      {status ? (
        <div className="loading-container">
          <img src={loading} alt="Ícone de carregamento" />
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
