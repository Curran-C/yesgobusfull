import React from "react";
import "./MyProfile.scss";

export default function MyProfile() {
  return (
    <div className="my__profile">
      <h1>Profile Info</h1>
      <div className="info__grid">
        <input
          type="Name"
          id="name"
          name="name"
          placeholder="Enter Name"
          className="profile__input"
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          className="profile__input"
        />

        <input
          type="tel"
          name="mobile"
          id="mobile"
          placeholder="Mobile Number"
          className="profile__input"
        />

        <input
          type="text"
          name="gender"
          id="gender"
          placeholder="Gender"
          className="profile__input"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="profile__input"
        />

        <button className="save-btn orange__button">Save</button>
      </div>
    </div>
  );
}
