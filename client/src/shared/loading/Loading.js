import './Loading.css';

export default function Loading({ status, message = '' }) {
  return (
    <>
      {status ? (
        <div className="loading-container">
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
