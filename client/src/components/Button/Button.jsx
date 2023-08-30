import "./Button.scss";

const Button = ({ text, onClicked }) => {
  return (
    <button onClick={onClicked} className="button">
      {text}
    </button>
  );
};

export default Button;
