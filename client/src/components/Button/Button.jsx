import "./Button.scss";

const Button = ({ text, onClicked, className }) => {
  return (
    <button onClick={onClicked} className={`button ${className}`}>
      {text}
    </button>
  );
};

export default Button;
