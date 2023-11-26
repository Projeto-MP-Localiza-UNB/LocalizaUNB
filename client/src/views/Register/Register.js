import { useState, useRef } from 'react';
import Error from '../../shared/error/Error';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../shared/loading/Loading';
import FormService from '../../services/formService';

export default function Register() {
  const [hasErrors, setHasErrors] = useState({
    name: null,
    email: null,
    password: null,
    repeat: null,
  });
  const [loading, setLoading] = useState(false);
  const passwordInput = useRef();
  const repeatPasswordInput = useRef();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const errors = {
      name: !FormService.validateName(data.name),
      email: !FormService.validateEmail(data.email),
      password: !FormService.validatePassword(data.password),
      repeat: !FormService.validatePassword(data.password, true, data.repeat),
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
      <div className="register-container">
        <form onSubmit={handleLogin} noValidate>
          <div className="form-field">
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Nome"
              className={hasErrors.name ? 'error' : ''}
            />
            <Error
              show={hasErrors.name}
              message="Insira um nome válido (máx. de 50 caracteres)"
            />
          </div>
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
              ref={passwordInput}
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              className={hasErrors.password || hasErrors.repeat ? 'error' : ''}
            />
            <Error show={hasErrors.password} message="Campo obrigatório" />
          </div>
          <div className="form-field">
            <input
              ref={repeatPasswordInput}
              type="password"
              name="repeat"
              id="repeat"
              placeholder="Confirmar senha"
              className={hasErrors.repeat ? 'error' : ''}
            />
            <Error
              show={hasErrors.repeat}
              message={
                passwordInput.current?.value &&
                repeatPasswordInput.current?.value
                  ? 'As senhas não coincidem'
                  : 'Campo obrigatório'
              }
            />
          </div>
          <button>Cadastrar</button>
        </form>
        <Link onClick={() => navigate(-1)} className="back">
          Voltar
        </Link>
      </div>
    </>
  );
}
