import './notification.styles.css';

const Notification = (props) => {

  if (props.hide) {
    return null;
  }

  return (
    <span className={props.color}>
      <p>{props.message}</p>
      {props.children}
    </span>
  )
}

export default Notification;