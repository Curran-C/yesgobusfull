import "./Button.scss";

const Button = ({ text, onClicked, className, disable = false }) => {
  return (
    <button onClick={onClicked} className={`button ${className}`} disabled={disable}>
      {text}
    </button>
  );
};

export default Button;
