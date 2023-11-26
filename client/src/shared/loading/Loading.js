import './Loading.css';

export default function Loading({ status, message = '' }) {
  return (
    <>
      {status ? (
        <div className="loading-container">
          <div class="loadingio-spinner-ripple-5xy4c5zt29d">
            <div class="ldio-g8ch4tbk3qp">
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
