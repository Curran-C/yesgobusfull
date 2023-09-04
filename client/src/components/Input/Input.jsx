import "./Input.scss";

const Input = ({ title, type, placeholder, onChanged, givenName }) => {
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   onChanged((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  return (
    <div className="Input">
      <label htmlFor="in">{title}</label>
      <input
        onChange={onChanged}
        type={type}
        placeholder={placeholder}
        name={givenName}
        id="in"
      />
    </div>
  );
};

export default Input;
