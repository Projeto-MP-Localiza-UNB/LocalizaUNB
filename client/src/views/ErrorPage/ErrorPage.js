import { Link, useRouteError } from "react-router-dom";
import Logo from "../../assets/icons/logoproject.png";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <section className="error-page">
        <div className="error-container">
          <div className="container">
            <div className="logo_unb">
              <img src={Logo} alt="logo localiza" className="logo" />
              <span className="unb"> </span>
            </div>
            <span className="text"> </span>
          </div>
          <span>Sinto muito, página não encontrada</span>
          <span>
            <i>
              {error.statusText || error.message} - {error.status}
            </i>
          </span>
          <span>
            <Link to="/" className="voltar-home">
              Voltar para a página inicial
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
