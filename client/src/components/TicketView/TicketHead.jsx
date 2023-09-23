import React from "react";
import { blacklogo } from "../../assets/homepage";
import { telephoneIcon } from "../../assets/contact";
import "./TicketHead.scss";

export default function TicketHead({ contactNumber }) {
  return (
    <header className="ticket__header">
      <div className="helpline">
        <img src={blacklogo} alt="yesgobus logo" style={{ width: "100px" }} />
        <div className="helpline__details">
          <img
            src={telephoneIcon}
            alt="telephone"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="helpline__number">
            <p>Yesgobus Helpline</p>
            <p>{contactNumber}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
