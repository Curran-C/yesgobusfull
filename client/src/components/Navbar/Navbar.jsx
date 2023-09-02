import { useState } from "react";
import { hamburger, logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./Navbar.scss";
import { blacklogo } from "../../assets/homepage";

const Navbar = ({ page }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menu = (
    <div className="burger-menu">
      <a href="/">
        <span>Home</span>
      </a>
      <a href="/busbooking">
        <span>Bus</span>
      </a>
      <a href="/comingsoon">
        <span>Cabs</span>
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
    <nav className="navbar burger">
      {/*logo*/}
      {/* navlinks */}
      <div className="left">
        {page === "home" ? (
          <img
            className="logo"
            onClick={() => navigate("/")}
            src={logo}
            alt=""
          />
        ) : (
          <img
            className="blacklogo"
            onClick={() => navigate("/")}
            src={blacklogo}
            alt=""
          />
        )}
        <a href="/busbooking">
          <span>Bus</span>
        </a>
        <a href="/comingsoon">
          <span>Cabs</span>
        </a>
        {/* <a>
          <span>Offers</span>
        </a> */}
        <a href="/contactus">
          <span>Contact Us</span>
        </a>
      </div>

      <div className="right">
        <a href="/login">
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

export default Navbar;
