import { rightarrow, whitestar } from "../../assets/busbooking";
import Button from "../Button/Button";
import "./BusBookingCardInfo.scss";

const BusBookingCardInfo = ({
  title,
  subtitle,
  rating,
  reviews,
  button,
  img,
  showSeats,
  setShowSeats,
  buttonText,
}) => {
  return (
    <div className="BusBookingCardInfo">
      <div className="busName">
        {title && <p className="title">{title}</p>}
        {img && <img className="img" src={rightarrow} />}
        {button && (
          <Button
            onClicked={() => setShowSeats(!showSeats)}
            text={buttonText || "Select"}
          />
        )}
        {rating && (
          <div className="rating">
            <div className="stars">
              <img src={whitestar} alt="" />
              {rating}
            </div>
            <p className="reviewCount">{reviews} reviews</p>
          </div>
        )}
      </div>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default BusBookingCardInfo;
