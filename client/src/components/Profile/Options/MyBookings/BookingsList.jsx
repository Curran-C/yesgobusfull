import React from "react";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../../assets/contact";

export default function BookingsList({ bookingData, selectedTab }) {
  const TicketOptions = ({ selectedTab }) => {
    if (selectedTab === "upcoming") {
      return (
        <>
          <Link to={`/busbooking/ticket`}>
            <button className="orange-btn">Download Ticket</button>
          </Link>
          <button className="red-btn">Cancel Ticket</button>
        </>
      );
    } else if (selectedTab === "completed") {
      return <button className="green-btn">Completed</button>;
    } else if (selectedTab === "cancelled") {
      return <button className="red-btn">Cancelled</button>;
    }
  };

  return (
    <div className="booking__details">
      {/* Logo */}
      <div className="logo">
        <img
          src={WatermarkIcon}
          alt=""
          style={{ width: "100px", margin: "0.5em" }}
        />
      </div>

      {/* Journey details */}
      <div className="journey__details">
        <h1>
          {bookingData.from} to {bookingData.to}
        </h1>
        <p>{bookingData.date}</p>
      </div>

      {/* Bus class */}
      <div className="bus__details">
        <h3>Yesgobus</h3>
        <p>{bookingData.class}</p>
      </div>

      <div
        className="ticket__options"
        style={{
          justifyContent: `${selectedTab === "upcoming" ? "" : "center"}`,
        }}
      >
        <TicketOptions selectedTab={selectedTab} />
      </div>
    </div>
  );
}
