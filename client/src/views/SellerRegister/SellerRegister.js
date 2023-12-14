import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormService from '../../services/formService';
import Error from '../../shared/error/Error';
import Loading from '../../shared/loading/Loading';
import LocalSelector from './components/LocalSelector/LocalSelector';
import Notification from '../../shared/notification/Notification';

import './SellerRegister.css';
import map from './assets/map.png';
import ok from './assets/icons8-ok.svg';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';

/**
 * Função para registrar um vendedor.
 *
 * @returns {JSX.Element} O componente SellerRegister.
 */
export default function SellerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeat: '',
    local: {},
    storeName: '',
    storeImage: '',
  });
  const [hasErrors, setHasErrors] = useState({
    name: null,
    storeName: null,
    email: null,
    password: null,
    repeat: null,
    local: null,
    storeImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [notification, setNotification] = useState({
    show: null,
    message: null,
    type: null,
  });

  const passwordInput = useRef();
  const repeatPasswordInput = useRef();
  const form = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!openMap && Object.values(formData.local).length) {
      setHasErrors((errors) => {
        return { ...errors, local: false };
      });
    }
  }, [openMap, formData]);

  function handleRegistration(e) {
    e.preventDefault();

    const errors = {
      name: !FormService.validateName(formData.name),
      email: !FormService.validateEmail(formData.email),
      password: !FormService.validatePassword(formData.password),
      repeat: !FormService.validatePassword(
        formData.password,
        true,
        formData.repeat
      ),
      storeName: !FormService.validateName(formData.storeName),
      local: !Object.values(formData.local).length,
    };
    setHasErrors(errors);
    if (!Object.values(errors).includes(true)) {
      setLoading(true);
      const data = {
        nome: formData.storeName,
        email: formData.email,
        senha: formData.password,
        imagem: formData.storeImage,
        longitude_fixa: formData.local.lat,
        latitude_fixa: formData.local.lng,
      };

      try {
        FormService.post('cadastrarLoja', JSON.stringify(data)).then((res) => {
          setLoading(false);
          switch (res.status) {
            case 200:
              setNotification({
                show: true,
                message: 'Cadastro realizado com sucesso! :)',
                type: 'success',
              });
              setTimeout(() => {
                navigate('/');
              }, 4000);
              break;
            case 400:
              setNotification(() => {
                return {
                  show: true,
                  message: 'Erro no cadastro, tente novamente mais tarde! :(',
                  type: 'error',
                };
              });
              setTimeout(
                () =>
                  setNotification((obj) => {
                    return { ...obj, show: false };
                  }),
                3000
              );
              break;
            default:
              setNotification(() => {
                return {
                  show: true,
                  message: 'Erro no cadastro, tente novamente mais tarde! :(',
                  type: 'error',
                };
              });
              setTimeout(
                () =>
                  setNotification((obj) => {
                    return { ...obj, show: false };
                  }),
                3000
              );
              return;
          }
        });
      } catch (e) {
        setNotification(() => {
          return {
            show: true,
            message:
              'Erro no cadastro, tente novamente mais tarde! :(' +
              `\n Erro: ${e}`,
            type: 'error',
          };
        });
        setTimeout(
          () =>
            setNotification((obj) => {
              return { ...obj, show: false };
            }),
          3000
        );
      }
    }
  }
  return (
    <>
      <Loading
        status={loading}
        fitContainer={true}
        message={'Enviado dados...'}
      />
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
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
        <form ref={form} onSubmit={handleRegistration} noValidate>
          <div className="form-field" style={{ gridColumn: '1', gridRow: '1' }}>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Nome de usuário"
              className={hasErrors.name ? 'error' : ''}
              value={formData.name}
              onChange={(e) => {
                setFormData((data) => ({ ...data, name: e.target.value }));
              }}
            />
            <Error
              show={hasErrors.name}
              message={
                formData.name
                  ? 'Campo obrigatório'
                  : 'Insira um nome válido (máx. de 50 caracteres)'
              }
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
              name="storeName"
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
              message={
                formData.storeName
                  ? 'Campo obrigatório'
                  : 'Máximo de 50 caracteres'
              }
            />
          </div>
          <div
            className="form-field"
            style={{
              gridColumn: '2',
              gridRow: '2',
            }}
          >
            <button
              onClick={() => setOpenMap(true)}
              className="open-map"
              type="button"
              style={{
                height: !hasErrors.local ? '100%' : 'calc(100% - 10px)',
              }}
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
            <Error
              show={hasErrors.local}
              message="Selecione um local no mapa"
            />
          </div>
          <div
            className="form-field"
            style={{ gridColumn: '2', gridRow: '3/5' }}
          >
            <DragAndDrop
              setData={(data) => setFormData({ ...formData, storeImage: data })}
              label={'Imagem da loja (opcional)'}
              name="storeImage"
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
      </div>
    </>
  );
}
