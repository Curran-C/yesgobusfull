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
}) => {
  return (
    <div className="BusBookingCardInfo">
      <div className="busName">
        {title && <p>{title}</p>}
        {img && <img src={rightarrow} />}
        {button && (
          <Button onClicked={() => setShowSeats(!showSeats)} text={"Select"} />
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
