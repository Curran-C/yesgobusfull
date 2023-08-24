import { livelocation } from "../../assets/busbooking";
import BusBookingCardInfo from "../BusBookingCardInfo/BusBookingCardInfo";
import DropDown from "../DropDown/DropDown";
import "./BusBookingCard.scss";

const BusBookingCard = ({
  title,
  busName,
  busType,
  rating,
  noOfReviews,
  pickUpTime,
  pickUpLocation,
  travelTime,
  reachTime,
  reachLocation,
  price,
  seatsLeft,
}) => {
  return (
    <div className="BusBookingCard">
      <h1>{title}</h1>
      <div className="cardContainer">
        <div className="cardWrapper">
          <BusBookingCardInfo
            title={busName}
            subtitle={busType}
            rating={rating}
            reviews={noOfReviews}
          />
          <div className="otherCards">
            <BusBookingCardInfo title={pickUpLocation} subtitle={pickUpTime} />
            <BusBookingCardInfo img={true} subtitle={travelTime} />
            <BusBookingCardInfo title={reachLocation} subtitle={reachTime} />
            <p className="price">₹{price}</p>
            <BusBookingCardInfo button={true} subtitle={seatsLeft} />
          </div>
        </div>
        <hr />
        <div className="liveLocation">
          <img src={livelocation} alt="" />
          <span>Live tracking</span>
        </div>
        <hr />
        <div className="dropDowns">
          <DropDown title="Policy" text="Lorem" />
          <DropDown title="Photos" text="Lorem" />
          <DropDown title="Aminities" text="Lorem" />
          <DropDown title="Pickup & Drop" text="Lorem" />
          <DropDown title="Reviews" text="Lorem" />
        </div>
      </div>
    </div>
  );
};

export default BusBookingCard;
