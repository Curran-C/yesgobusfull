import { useState } from "react";
import { blackhamburger, hamburger, logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./Navbar.scss";
import { blacklogo } from "../../assets/homepage";

const Navbar = ({ page }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const loggedInUser = localStorage.getItem("loggedInUser");

  const menu = (
    <div className="burger-menu">
      <a href="/">
        <span>Home</span>
      </a>
      <a href="/busbooking">
        <span>Bus</span>
      </a>
      <a href="/cabs">
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
            width={50}
            height={50}
            alt=""
          />
        ) : (
          <img
            className="blacklogo"
            onClick={() => navigate("/")}
            src={blacklogo}
            width={50}
            alt=""
          />
        )}
        <a href="/busbooking">
          <span>Bus</span>
        </a>
        <a href="/cabs">
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
        {loggedInUser ? (
          <Button text="Logout" onClicked={handleLogout} />
        ) : (
          <a href="/login">
            <Button text="Login / Signup" />
          </a>
        )}
      </div>

      {/* burger menu */}
      {page === "home" ? (
        <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={hamburger}
          alt=""
        />
      ) : (
        <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={blackhamburger}
          alt=""
        />
      )}
      {showMenu && menu}
    </nav>
  );
};

export default Navbar;
