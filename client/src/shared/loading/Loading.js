import './Loading.css';

/**
 * Componente para apresentação de estado de carregamento
 * @param {boolean} status - Estado do carregamento. Altere para _true_ para renderizar o componente.
 * @param {string} message - Mensagem opcional localizada abaixo do símbolo de carregamento
 */
export default function Loading({
  status,
  fitContainer = false,
  message = '',
}) {
  return (
    <>
      {status ? (
        <div
          className="loading-container"
          style={{
            width: fitContainer ? '100%' : '100vw',
            height: fitContainer ? '100%' : '100vw',
            position: fitContainer ? 'absolute' : 'fixed',
          }}
        >
          <div className="loadingio-spinner-ripple-5xy4c5zt29d">
            <div className="ldio-g8ch4tbk3qp">
              <div></div>
              <div></div>
            </div>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
