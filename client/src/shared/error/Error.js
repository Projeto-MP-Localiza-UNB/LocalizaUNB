import './Error.css';

export default function Error({ show, message }) {
  return show ? <p className="error">{message}</p> : <></>;
}
