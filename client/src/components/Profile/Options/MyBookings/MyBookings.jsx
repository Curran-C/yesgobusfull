import React, { useState, useEffect } from "react";
import "./MyBookings.scss";
import BookingsList from "./BookingsList";
import axios from "axios";

export default function MyBookings() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [bookingDetails, setBookingDetails] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const { data: getBookingDetails } = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/busBooking/getAllBookings/${loggedInUser._id}`
        );
        console.log(getBookingDetails); 
        setBookingDetails(getBookingDetails.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookingDetails();
  }, [cancelled]);


  const [selectedTab, setSelectedTab] = useState("upcoming");

  return (
    <div className="my__bookings">
      {/* Tabs for my bookings */}
      <div className="tabs">
        <button
          className={`tab__btn ${selectedTab === "upcoming" ? "active" : ""} `}
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`tab__btn ${selectedTab === "completed" ? "active" : ""} `}
          onClick={() => setSelectedTab("completed")}
        >
          Completed
        </button>
        <button
          className={`tab__btn ${selectedTab === "cancelled" ? "active" : ""} `}
          onClick={() => setSelectedTab("cancelled")}
        >
          Cancelled
        </button>
      </div>

      {/* data container */}
      <BookingsList bookingData={bookingDetails} selectedTab={selectedTab} setCancelled={setCancelled} cancelled={cancelled}/>
    </div>
  );
}
