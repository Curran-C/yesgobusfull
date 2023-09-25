import React, { useState } from "react";
import "./Profile.scss";
import { Navbar } from "../../components";
import UserIcon from "../../components/Profile/Icons/UserIcon";
import TicketIcon from "../../components/Profile/Icons/TicketIcon";
import NotificationIcon from "../../components/Profile/Icons/NotificationIcon";
import MyProfile from "../../components/Profile/Options/MyProfile/MyProfile";
import MyBookings from "../../components/Profile/Options/MyBookings/MyBookings";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

export default function Profile() {
  const [profileOption, setProfileOption] = useState("profile");
  const navigate = useNavigate();

  const Options = {
    profile: <MyProfile />,
    booking: <MyBookings />,
    // notifications: "",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="profile__wrapper">
      <Navbar />
      <section className="profile">
        {/* Sidebar */}
        <aside className="profile__sidebar">
          <button
            className={`sidebar__button user ${
              profileOption === "profile" ? "active" : ""
            } `}
            onClick={() => {
              setProfileOption("profile");
            }}
          >
            <UserIcon style={{ width: "20px" }} />
            My Profile
          </button>
          <button
            className={`sidebar__button ${
              profileOption === "booking" ? "active" : ""
            } `}
            onClick={() => {
              setProfileOption("booking");
            }}
          >
            <TicketIcon style={{ width: "20px" }} />
            My Booking
          </button>
          {/* <button
            className={`sidebar__button ${profileOption === "notification" ? "active" : ""} `}
            id="notification"
            onClick={() => {
              setProfileOption("notification");
            }}
          >
            <NotificationIcon style={{ width: "20px" }} />
            Notifications
          </button> */}
          <div className="logout__btn">
            <Button text="Logout" onClicked={handleLogout} />
          </div>
        </aside>

        {/* Main */}
        <main className="profile__options">{Options[profileOption]}</main>
      </section>
    </div>
  );
}
