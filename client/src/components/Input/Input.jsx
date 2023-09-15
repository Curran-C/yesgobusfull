import "./Input.scss";

const Input = ({ title, type, placeholder, onChanged, givenName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChanged((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="Input">
      <span className="title">{title}</span>
      <input
        name={givenName}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
