import React from "react";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../../assets/contact";

export default function BookingsList({ bookingData, selectedTab }) {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const TicketOptions = ({ selectedTab, bookingId, tid }) => {
    const handleCancelTicket = async (bookingId, tid) => {
      try {
        console.log(bookingId, tid);
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedTab === "upcoming") {
      return (
        <>
          <Link to={`/busbooking/ticket?bookingId=${bookingId}&download=1`}>
            <button className="orange-btn">Download Ticket</button>
          </Link>
          <button className="red-btn" onClick={() => handleCancelTicket(bookingId, tid)}>Cancel Ticket</button>
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

      {bookingData?.map((booking, index) => (
        <div key={index}>
          {/* Journey details */}
          <div className="journey__details">
            <h1>
              {booking.sourceCity} to {booking.destinationCity}
            </h1>
            <p>{formatDate(booking.doj)}</p>
          </div>

          {/* Bus class */}
          <div className="bus__details">
            <h3>{booking.busOperator}</h3>
            <p>{booking.busType}</p>
          </div>

          <div
            className="ticket__options"
            style={{
              justifyContent: `${selectedTab === "upcoming" ? "" : "center"}`,
            }}
          >
            <TicketOptions selectedTab={selectedTab} bookingId={booking._id} tid={booking.tid} />
          </div>
        </div>
      ))}
    </div>
  );
}
