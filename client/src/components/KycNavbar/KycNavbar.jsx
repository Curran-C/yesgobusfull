import { useState } from "react";
import { hamburger } from "../../assets";
import { logoblack } from "../../assets/homepage/index";
import Button from "../Button/Button";

import "./KycNavbar.scss";

const KycNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menu = (
    <div className="burger-menu">
      <a href="/">
        <span>Home</span>
      </a>
      <a>
        <span>Cab</span>
      </a>
      {/* <a>
        <span>Offers</span>
      </a> */}
      <a href="/contactus">
        <span>Contact Us</span>
      </a>
    </div>
  );

  return (
    <nav className="kyc_navbar burger">
      {/*logo*/}
      {/* navlinks */}
      <div className="left">
        <a href="/">
          <img src={logoblack} alt="" />
        </a>
        <a href="/cabs">
          <span>Cab</span>
        </a>
        {/* <a>
          <span>Offers</span>
        </a> */}
        <a href="/contactus">
          <span>Contact Us</span>
        </a>
      </div>

      <div className="right">
        <a href="/cabs/kyc">
          <Button text="Join as Cab Driver" />
        </a>
      </div>

      {/* burger menu */}
      <img
        className="hamburger"
        onClick={() => setShowMenu(!showMenu)}
        src={hamburger}
        alt=""
      />
      {showMenu && menu}
    </nav>
  );
};

export default KycNavbar;
