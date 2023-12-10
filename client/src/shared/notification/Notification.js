import './Notification.css';

export default function Notification({ show, type, message }) {
  return (
    show && (
      <div className="notification-container">
        <div className={['notification', type].join(' ')}>
          <p>{message}</p>
        </div>
      </div>
    )
  );
}
