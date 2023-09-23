import React from "react";
import "./Profile.scss";
import { Navbar } from "../../components";

export default function Profile() {
  return (
    <div className="profile__wrapper">
      <Navbar />
      <section className="profile">
        <aside className="profile__sidebar"></aside>
        <main className="profile__container"></main>
      </section>
    </div>
  );
}
