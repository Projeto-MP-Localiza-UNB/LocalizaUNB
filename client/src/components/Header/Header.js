import "./Header.css";
import Logo from "../../assets/icons/logoproject.png";
import { Link } from "react-router-dom";

const Header = () => {
  const user = {}; // TODO: pegar user de um context

  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo_unb">
          <img src={Logo} alt="logo localiza" className="logo" />
        </Link>
        <span className="text"> </span>
      </div>
      <div>
        {Object.keys(user).length ? (
          <Link to="/profile" className="login">
            Perfil
          </Link>
        ) : (
          <>
            <Link to="/register" className="create-account">
              Criar conta
            </Link>
            <Link to="/login" className="login">
              Entrar
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
