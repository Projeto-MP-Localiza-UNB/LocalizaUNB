import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormService from '../../services/formService';
import Error from '../../shared/error/Error';
import Loading from '../../shared/loading/Loading';
import LocalSelector from './components/LocalSelector/LocalSelector';

import './SellerRegister.css';
import map from './assets/map.png';
import ok from './assets/icons8-ok.svg';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';

export default function SellerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    password: '',
    repeat: '',
    local: {},
    image: '',
  });
  const [hasErrors, setHasErrors] = useState({
    name: null,
    storeName: null,
    email: null,
    password: null,
    repeat: null,
    local: null,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const passwordInput = useRef();
  const repeatPasswordInput = useRef();
  const form = useRef();
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
      <LocalSelector
        open={openMap}
        setOpen={setOpenMap}
        setFormData={setFormData}
      />
      <svg
        style={{ position: 'absolute', top: '0', right: '0' }}
        width="50vw"
        height="100vh"
      >
        <circle cx="90%" cy="50%" r="65vh" fill="#6CABCD" />
      </svg>
      <div className="seller-register-container">
        <header className="seller-register-header">
          <h1>Cadastro de Vendedores</h1>
        </header>
        <form ref={form} onSubmit={handleLogin} noValidate>
          <div className="form-field" style={{ gridColumn: '1', gridRow: '1' }}>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Nome"
              className={hasErrors.name ? 'error' : ''}
              value={formData.name}
              onChange={(e) => {
                setFormData((data) => ({ ...data, name: e.target.value }));
              }}
            />
            <Error
              show={hasErrors.name}
              message="Insira um nome válido (máx. de 50 caracteres)"
            />
          </div>
          <div className="form-field" style={{ gridColumn: '1', gridRow: '2' }}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className={hasErrors.email ? 'error' : ''}
              value={formData.email}
              onChange={(e) => {
                setFormData((data) => ({ ...data, email: e.target.value }));
              }}
            />
            <Error show={hasErrors.email} message="Insira um e-mail válido" />
          </div>
          <div className="form-field" style={{ gridColumn: '1', gridRow: '3' }}>
            <input
              ref={passwordInput}
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              className={hasErrors.password || hasErrors.repeat ? 'error' : ''}
              value={formData.password}
              onChange={(e) => {
                setFormData((data) => ({ ...data, password: e.target.value }));
              }}
            />
            <Error show={hasErrors.password} message="Campo obrigatório" />
          </div>
          <div className="form-field" style={{ gridColumn: '1', gridRow: '4' }}>
            <input
              ref={repeatPasswordInput}
              type="password"
              name="repeat"
              id="repeat"
              placeholder="Confirmar senha"
              className={hasErrors.repeat ? 'error' : ''}
              value={formData.repeat}
              onChange={(e) => {
                setFormData((data) => ({ ...data, repeat: e.target.value }));
              }}
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
          <div className="form-field" style={{ gridColumn: '2', gridRow: '1' }}>
            <input
              type="text"
              name="store_name"
              id="store-name"
              placeholder="Nome da loja"
              className={hasErrors.storeName ? 'error' : ''}
              value={formData.storeName}
              onChange={(e) => {
                setFormData((data) => ({ ...data, storeName: e.target.value }));
              }}
            />
            <Error
              show={hasErrors.storeName}
              message="Máximo de 50 caracteres"
            />
          </div>
          <div className="form-field" style={{ gridColumn: '2', gridRow: '2' }}>
            <button
              onClick={() => setOpenMap(true)}
              className={[
                'open-map',
                Object.values(formData.local).length ? 'set' : '',
              ].join(' ')}
              type="button"
            >
              {Object.values(formData.local).length
                ? 'Local selecionado'
                : 'Selecionar localização'}
              <img
                className="map-icon"
                src={Object.values(formData.local).length ? ok : map}
                alt="ícone de mapa"
              />
            </button>
          </div>

          <div
            className="form-field"
            style={{ gridColumn: '2', gridRow: '3/5' }}
          >
            <DragAndDrop
              setData={(data) => setFormData({ ...formData, image: data })}
            />
          </div>
          <button style={{ gridColumn: '2', gridRow: '5' }}>Cadastrar</button>
          <Link
            style={{ gridColumn: '1', gridRow: '5' }}
            onClick={() => navigate(-1)}
            className="back"
          >
            Voltar
          </Link>
        </form>
        {/* {JSON.stringify(formData)} */}
      </div>
    </>
  );
}
