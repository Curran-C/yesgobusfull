import { logo } from "../../assets";
import Button from "../Button/Button";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/*logo*/}
      {/* navlinks */}
      <div className="left">
        <img src={logo} alt="" />
        <a>
          <span>Bus Ticket</span>
        </a>
        <a>
          <span>Cabs</span>
        </a>
        <a>
          <span>Offers</span>
        </a>
        <a>
          <span>Contact Us</span>
        </a>
      </div>

      <div className="right">
        <a href="/signup">
          <Button text="Join as Cab Driver" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
