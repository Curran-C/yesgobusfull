import Button from "../Button/Button";
import "./Card.scss";

const Card = ({ img, title, subtitle, text }) => {
  return (
    <div className="card">
      <div className="firstContainer">
        <img src={img} alt="" />
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <Button text={text} />
    </div>
  );
};

export default Card;
