import "./SimpleCard.scss";

const SimpleCard = ({ text, date, locationOne, locationTwo }) => {
  return (
    <div className="SimpleCard">
      <p>{text}</p>
      <p>{date}</p>
      <div className="down">
        <span>{locationOne}</span>
        <span>{locationTwo}</span>
      </div>
    </div>
  );
};

export default SimpleCard;
