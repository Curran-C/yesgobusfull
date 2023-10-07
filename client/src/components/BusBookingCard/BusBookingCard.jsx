import { useState } from "react";
import { livelocation } from "../../assets/busbooking";
import BusBookingCardInfo from "../BusBookingCardInfo/BusBookingCardInfo";
import DropDown from "../DropDown/DropDown";
import "./BusBookingCard.scss";
import Seats from "../Seats/Seats";
import axios from "axios";
import { Spin } from "antd";

const BusBookingCard = ({
  routeScheduleId,
  inventoryType,
  sourceCity,
  destinationCity,
  doj,
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
  cancellationPolicy,
  // pickUpTimes,
  // pickUpLocationOne,
  // pickUpLocationTwo,
  // dropTimes,
  // dropLocationOne,
  // dropLocationTwo,
  backSeat,
}) => {
  const [showSeats, setShowSeats] = useState(false);
  const [seatDetails, setSeatDetails] = useState([]);
  const [seatLoading, setSeatLoading] = useState(false);

  const fetchSeatData = async () => {
    setSeatLoading(true);
    let seatData = [];
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout`,
        {
          sourceCity: sourceCity,
          destinationCity: destinationCity,
          doj: doj,
          inventoryType: inventoryType,
          routeScheduleId: routeScheduleId,
        }
      );
      seatData = response.data.seats;
    } catch (error) {
      alert("Something went wrong");
      console.error("Something went wrong:", error);
    }
    setSeatDetails(seatData);
    setSeatLoading(false);
    setShowSeats(true);
  };

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
            <BusBookingCardInfo
              setShowSeats={fetchSeatData}
              buttonText={!seatsLeft || (!seatDetails && "Full")}
              showSeats={showSeats}
              button={true}
              subtitle={seatsLeft || "No seats left"}
            />
          </div>
        </div>
        {/* <hr />
        <div style={{ marginBottom: "10px" }} className="liveLocation">
          <img src={livelocation} alt="" />
          <span>Live tracking</span>
        </div> */}
        <Spin
          spinning={seatLoading}
          // colorText="#fd5901"
          className="loading_seats"
        />
        {/* <hr /> */}
        {/* <div className="dropDowns">
          <DropDown title="Policy" text="Lorem" />
          <DropDown title="Photos" text="Lorem" />
          <DropDown title="Aminities" text="Lorem" />
          <DropDown title="Pickup & Drop" text="Lorem" />
          <DropDown title="Reviews" text="Lorem" />
        </div> */}
      </div>
      {showSeats && seatsLeft && seatDetails && (
        <Seats
          travelTime={travelTime}
          pickUpTime={pickUpTime}
          reachTime={reachTime}
          routeScheduleId={routeScheduleId}
          inventoryType={inventoryType}
          sourceCity={sourceCity}
          destinationCity={destinationCity}
          doj={doj}
          // pickUpTimes={pickUpTimes}
          // pickUpLocationOne={pickUpLocationOne}
          // pickUpLocationTwo={pickUpLocationTwo}
          // dropTimes={dropTimes}
          // dropLocationOne={dropLocationOne}
          // dropLocationTwo={dropLocationTwo}
          backSeat={backSeat}
          busName={busName}
          busType={busType}
          price={price}
          seatDetails={seatDetails}
          cancellationPolicy={cancellationPolicy}
        />
      )}
    </div>
  );
};

export default BusBookingCard;
