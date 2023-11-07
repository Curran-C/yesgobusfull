import React from "react";
import { telephoneIconFill } from "../../assets/contact";
import "./CustomerSupport.scss";

export default function CustomerSupport({ contactNumber }) {
  return (
    <div className="customer__support">
      <h2>Customer Support and Enquiries</h2>
      <div className="support__contact">
        <img src={telephoneIconFill} alt="" />
        <div className="support__number">
          <h3 className="">Yesgobus</h3>
          <p>{contactNumber}</p>
        </div>
      </div>
    </div>
  );
}
