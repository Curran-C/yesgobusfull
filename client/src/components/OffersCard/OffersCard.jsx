import { copy } from "../../assets/homepage";
import "./OffersCard.scss";

const OffersCard = ({ img, title, subtitle, code, date }) => {
  return (
    <div className="offersCard">
      <div className="container">
        <div className="left">
          <img src={img} alt="" />
        </div>
        <div className="right">
          <h1>{title}</h1>
          <p>{subtitle} </p>
          <div className="offerCode">
            <span>{code}</span>
            <img src={copy} alt="" />
          </div>
        </div>
      </div>
      <p className="valid">{`Valid till: ${date}`}</p>
    </div>
  );
};

export default OffersCard;
