import React, { useState, useEffect } from "react";
import "./MyBookings.scss";
import BookingsList from "./BookingsList";
import axiosInstance from "../../../../utils/service";
import { Spin } from "antd";

export default function MyBookings() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [bookingDetails, setBookingDetails] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookingDetails = async () => {
      setLoading(true);
      try {
        const { data: getBookingDetails } = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL
          }/api/busBooking/getAllBookings/${loggedInUser._id}`
        );
        const currentDate = new Date();
        const upcomingBookings = [];
        const completedBookings = [];
        const cancelledBookings = [];

        getBookingDetails.data.forEach(booking => {
          const doj = new Date(booking.doj);
          if (doj > currentDate && booking.bookingStatus === "paid") {
            upcomingBookings.push(booking);
          } else if (doj < currentDate && booking.bookingStatus === "paid") {
            completedBookings.push(booking);
          } else if (booking.bookingStatus === "cancelled") {
            cancelledBookings.push(booking);
          }
        });

        setBookingDetails({
          upcoming: upcomingBookings,
          completed: completedBookings,
          cancelled: cancelledBookings
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : null}
      {/* data container */}
      <BookingsList bookingData={bookingDetails} selectedTab={selectedTab} setCancelled={setCancelled} cancelled={cancelled} />
    </div>
  );
}
