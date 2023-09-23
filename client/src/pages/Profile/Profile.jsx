import React from "react";
import "./Profile.scss";
import { Navbar } from "../../components";

export default function Profile() {
  return (
    <div className="profile__wrapper">
      <Navbar />
      <section>
        <h1>Profile</h1>
      </section>
    </div>
  );
}
