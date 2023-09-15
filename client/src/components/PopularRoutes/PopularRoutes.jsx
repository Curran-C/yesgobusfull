import { graybus } from "../../assets/homepage";
import { Link } from "react-router-dom";
import "./PopularRoutes.scss";

const PopularRoutes = ({ busname, to }) => {
  let toLocation = busname.split(" ")[0];

  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  currentDate = `${year}-${month}-${day}`;

  return (
    <Link
      to={`/busbooking?from=Bangalore&to=${toLocation}&date=${currentDate}`}
      target="_blank"
      className="link"
    >
      <div className="popularRoutes">
        <div className="left">
          <img src={graybus} alt="" />
        </div>
        <div className="right">
          <h1>{busname}</h1>
          <p>{`To: ${to}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default PopularRoutes;
