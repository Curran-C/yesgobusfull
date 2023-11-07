import Button from "../Button/Button";
import "./Card.scss";

const Card = ({ img, title, subtitle, text, link }) => {
  const send = () => {
    if (text === "Send Mail") window.location.href = `mailto:${link}`;
    else if (text === "Call Us") window.location.href = `tel:${link}`;
  };
  return (
    <div className="card">
      <div className="firstContainer">
        <img src={img} alt="" />
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {text && <Button text={text} onClicked={send} />}
    </div>
  );
};

export default Card;
