import './Error.css';

/**
 * Componente para apresentação de uma mensagem de erro na validação de formulários
 * @param {boolean} show - Altere para _true_ para renderizar o componente.
 * @param {string} message - Mensagem a ser apresentada ao usuário após validação do formulário.
 */
export default function Error({ show, message }) {
  return show ? <p className="error">{message}</p> : <></>;
}
