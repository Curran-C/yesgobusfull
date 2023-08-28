import "./Input.scss";

const Input = ({ title, type, placeholder }) => {
  return (
    <div className="Input">
      <label htmlFor="in">{title}</label>
      <input type={type} placeholder={placeholder} id="in" />
    </div>
  );
};

export default Input;
