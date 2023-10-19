import { rightarrow, whitestar } from "../../assets/busbooking";
import Button from "../Button/Button";
import "./BusBookingCardInfo.scss";

const BusBookingCardInfo = ({
  title,
  subtitle,
  subtitleLeft,
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
            text={showSeats ? "Unselect" : buttonText || "Select"}
          />
        )}
      </div>
      <p
        className="subtitle"
        style={{ marginRight: subtitleLeft ? "auto" : 0 }}
      >
        {subtitle}
      </p>
      {rating && (
        <div className="rating" style={{ marginRight: "auto" }}>
          <div className="stars">
            <img src={whitestar} alt="" />
            {rating}
          </div>
          <p className="reviewCount">{reviews} reviews</p>
        </div>
      )}
    </div>
  );
};

export default BusBookingCardInfo;
