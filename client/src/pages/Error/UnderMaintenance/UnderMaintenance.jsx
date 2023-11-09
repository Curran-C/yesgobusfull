import { Link } from "react-router-dom";
import { Navbar } from "../../../components";
import "./UnderMaintenance.scss";

const UnderMaintenance = () => {
  return (
    <div className="under-maintenance-page">
      <Navbar />
      <section>
        <h1>Page is under maintenance</h1>
        <p>
          We apologize for the inconvenience. The page is currently undergoing
          maintenance to improve your experience. Please check back later.
        </p>
        <Link to="/" className="button">
          Home
        </Link>
      </section>
    </div>
  );
};

export default UnderMaintenance;
