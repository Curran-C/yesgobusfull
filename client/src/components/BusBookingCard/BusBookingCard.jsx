import { useEffect, useState } from "react";
import { livelocation } from "../../assets/busbooking";
import BusBookingCardInfo from "../BusBookingCardInfo/BusBookingCardInfo";
import DropDown from "../DropDown/DropDown";
import "./BusBookingCard.scss";
import Seats from "../Seats/Seats";
import axiosInstance from "../../utils/service";
import { Spin } from "antd";
import toast, { Toaster } from 'react-hot-toast';

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
  pickUpTimes,
  pickUpLocationOne,
  // pickUpLocationTwo,
  dropTimes,
  dropLocationOne,
  // dropLocationTwo,
  backSeat,
  fare,
}) => {
  const [showSeats, setShowSeats] = useState(false);
  const [seatDetails, setSeatDetails] = useState([]);
  const [seatLoading, setSeatLoading] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(seatsLeft);

  const fetchSeatData = async () => {
    if (!showSeats === false) {
      setShowSeats(!showSeats);
      return;
    }
    setSeatLoading(true);
    let seatData = [];
    const requestBody = {
      sourceCity: sourceCity,
      destinationCity: destinationCity,
      doj: doj,
      inventoryType: inventoryType,
      routeScheduleId: routeScheduleId,
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();

      // const response = await axiosInstance.post(
      //   `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout`,
      //   requestBody,
      // );
      seatData = data?.seats;
      const availableSeats = seatData?.filter(seat => seat.available === true);
      setAvailableSeats(availableSeats?.length);
      setSeatDetails(seatData);
      setSeatLoading(false);
      setShowSeats(!showSeats);
    } catch (error) {
      if (error.response) {
        toast.error(`Server Error: ${error.response.status}`, {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        console.error("Server Error:", error.response.data);
        setSeatLoading(false);
      } else if (error.request) {
        toast.error('Network Error: Unable to connect to the server', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        setSeatLoading(false);
        console.error("Network Error:", error.request);
      } else {
        toast.error('An unexpected error occurred', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        setSeatLoading(false);
        console.error("Something went wrong:", error);
      }
    }
  };


  return (
    <div className={`BusBookingCard ${showSeats && "bg-lightgrey"}`}>
      <h1>{title}</h1>
      <div className="cardContainer">
        <div className="cardWrapper">
          <BusBookingCardInfo
            title={busType}
            // title={busName}
            // subtitle={busType}
            rating={rating}
            reviews={noOfReviews}
            subtitleLeft
          />
          <div className="otherCards">
            <BusBookingCardInfo subtitle={pickUpLocation} title={pickUpTime} />
            {/* <BusBookingCardInfo img={true} title={travelTime} /> */}
            <BusBookingCardInfo title={travelTime} />
            <BusBookingCardInfo subtitle={reachLocation} title={reachTime} />
            <p className="price">₹{price}</p>
            <BusBookingCardInfo
              setShowSeats={fetchSeatData}
              buttonText={!availableSeats || (!seatDetails && "Full")}
              showSeats={showSeats}
              button={true}
              subtitle={availableSeats || "No seats left"}
            />
          </div>
        </div>
        <div className={`card-wrapper-mobile`} onClick={() => fetchSeatData()}>
          <h6 className="title">
            <span className="text-orange">YESGO</span>BUS
          </h6>
          <div className="time-and-price">
            <h4>
              {pickUpTime} ─ {reachTime}
            </h4>
            <span className="price-container">
              <p>From</p>{" "}
              <p className="price">₹ {price}</p>
            </span>
          </div>
          <div className="duration-and-seats-left">
            <span className="duration">{travelTime}</span>
            <span className="seats-left text-orange">{availableSeats} Seats</span>
          </div>
          <div className="bus-details-container">
            <div className="bus-details">
              <h4>{busName}</h4>
              <h4 className="lighter">{busType}</h4>
            </div>
            <div className="ratings-container">
              <span className="rating">
                ★ {(Math.random() * 1 + 4).toFixed(1)}
              </span>
              <span className="count">
                {Math.floor(Math.random() * 101) + 37}
              </span>
            </div>
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
          pickUpLocationOne={pickUpLocationOne}
          // pickUpLocationTwo={pickUpLocationTwo}
          // dropTimes={dropTimes}
          dropLocationOne={dropLocationOne}
          // dropLocationTwo={dropLocationTwo}
          backSeat={backSeat}
          busName={busName}
          busType={busType}
          price={price}
          seatDetails={seatDetails}
          cancellationPolicy={cancellationPolicy}
          fare={fare}
        />
      )}
      <Toaster />
    </div>

  );
};

export default BusBookingCard;
