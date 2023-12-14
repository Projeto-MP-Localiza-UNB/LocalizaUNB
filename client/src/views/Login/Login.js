import { useState } from 'react';
import Error from '../../shared/error/Error';
import './Login.css';
import { Link } from 'react-router-dom';
import Loading from '../../shared/loading/Loading';
import FormService from '../../services/formService';

/**
 * Função de login.
 *
 * @returns {JSX.Element} O componente de login.
 */
export default function Login() {
  const [hasErrors, setHasErrors] = useState({ email: null, password: null });
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const errors = {
      email: !FormService.validateEmail(data.email),
      password: !FormService.validatePassword(data.password),
    };
    setHasErrors(errors);
    if (!Object.values(errors).includes(true)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      // do something
    }
  }

  return (
    <>
      <Loading status={loading} />
      <svg
        style={{ position: 'absolute', top: '0', right: '0' }}
        width="50vw"
        height="100vh"
      >
        <circle cx="90%" cy="50%" r="65vh" fill="#6CABCD" />
      </svg>
      <div className="login-container">
        <form onSubmit={handleLogin} noValidate>
          <div className="form-field">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className={hasErrors.email ? 'error' : ''}
            />
            <Error show={hasErrors.email} message="Insira um e-mail válido" />
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              className={hasErrors.password ? 'error' : ''}
            />
            <Error show={hasErrors.password} message="Campo obrigatório" />
          </div>
          <button>Entrar</button>
        </form>
        <button className="forgot-password">Esqueceu a senha?</button>
        <svg width="100%" height="2.5">
          <rect x="0" y="0" width="100%" height="2.5" rx="5" fill="#D9D9D9" />
        </svg>
        <Link to="/register" className="register">
          Cria nova conta
        </Link>
        <span>
          Você é um vendedor?{' '}
          <Link to={'../seller-register'}>
            <button>Clique aqui!</button>
          </Link>
        </span>
        <Link to="/" className="back">
          Voltar
        </Link>
      </div>
    </>
  );
}
