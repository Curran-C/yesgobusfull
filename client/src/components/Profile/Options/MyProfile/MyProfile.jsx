import React, { useEffect, useState } from "react";
import "./MyProfile.scss";
import axios from "axios";

export default function MyProfile() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [formData, setFormData] = useState({
    fullName: loggedInUser.fullName || "",
    email: loggedInUser.email || "",
    phoneNumber: loggedInUser.phoneNumber || "",
    gender: loggedInUser.gender || "Select Gender",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data: updatedUser } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/user/updateProfile/${loggedInUser._id}`, formData
      );
      if(updatedUser.status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser.data));
        alert("Profile Updated"); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my__profile">
      <h1>Profile Info</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="info__grid">
        <input
          type="Name"
          id="name"
          name="fullName"
          placeholder="Enter Name"
          className="profile__input"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          className="profile__input"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="tel"
          name="phoneNumber"
          id="mobile"
          placeholder="Mobile Number"
          className="profile__input"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <select
          name="gender"
          id="gender"
          className="profile__input select"
          value={formData.gender}
          onChange={handleInputChange}
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

        {/* <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="profile__input"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
        /> */}

        <button type="submit" className="save-btn orange__button">
          Save
        </button>
      </form>
    </div>
  );
}
