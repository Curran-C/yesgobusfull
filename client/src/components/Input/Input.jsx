import "./Input.scss";

const Input = ({ title, type, placeholder, onChanged }) => {
  return (
    <div className="Input">
      <label htmlFor="in">{title}</label>
      <input
        onChange={onChanged}
        type={type}
        placeholder={placeholder}
        id="in"
      />
    </div>
  );
};

export default Input;
