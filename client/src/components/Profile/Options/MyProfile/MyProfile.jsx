import React from "react";
import "./MyProfile.scss";

export default function MyProfile() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="my__profile">
      <h1>Profile Info</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="info__grid">
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

        <select
          name="gender"
          id="gender"
          className="profile__input select"
          defaultValue={"Select Gender"}
        >
          <option
            value="Select Gender"
            disabled
            style={{ color: "rgba(121, 121, 121, 1)" }}
          >
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="profile__input"
          autoComplete="new-password"
        />

        <button type="submit" className="save-btn orange__button">
          Save
        </button>
      </form>
    </div>
  );
}
