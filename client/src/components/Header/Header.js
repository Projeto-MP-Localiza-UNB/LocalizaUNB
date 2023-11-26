import React from 'react';
import './Header.css';
import Logo from '../../assets/icons/icone-padrao.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to={'/'} className="logo_unb">
          <img src={Logo} alt="logo localiza" className="logo" />
          <span className="unb"> UnB </span>
        </Link>
        <span className="text"> Restaurante ou Vendedor </span>
      </div>
      <div>
        <Link to="/register" className="create-account">
          Criar conta
        </Link>
        <Link to="/login" className="login">
          Entrar
        </Link>
      </div>
    </header>
  );
};

export default Header;
