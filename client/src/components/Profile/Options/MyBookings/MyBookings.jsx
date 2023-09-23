import React, { useState } from "react";
import "./MyBookings.scss";
import BookingsList from "./BookingsList";

export default function MyBookings() {
  // Mock data for ticket
  const bookingData = {
    from: "Mysore",
    to: "Bangalore",
    date: "Tuesday, 04 July, 2023",
    class: "TATA A/C Sleeper (2+1) 44 Seats",
    boarding: {
      time: "19:00",
      date: "4th July 2023",
      location: "Infosys Gate",
      subLocation: "INFOSYS GATE NO 2,134,33",
    },
    dropping: {
      time: "21:00",
      date: "4th July 2023",
      location: "Hcross",
      subLocation: "Hcross high way , bng",
    },
  };

  const [selectedTab, setSelectedTab] = useState("upcoming");

  return (
    <div className="my__bookings">
      {/* Tabs for my bookings */}
      <div className="tabs">
        <button className="tab__btn" onClick={() => setSelectedTab("upcoming")}>
          Upcoming
        </button>
        <button
          className="tab__btn"
          onClick={() => setSelectedTab("completed")}
        >
          Completed
        </button>
        <button
          className="tab__btn"
          onClick={() => setSelectedTab("cancelled")}
        >
          Cancelled
        </button>
      </div>

      {/* data container */}
      <BookingsList bookingData={bookingData} selectedTab={selectedTab} />
    </div>
  );
}
