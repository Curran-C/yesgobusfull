import { graybus } from "../../assets/homepage";
import "./PopularRoutes.scss";

const PopularRoutes = ({ busname, to }) => {
  return (
    <div className="popularRoutes">
      <div className="left">
        <img src={graybus} alt="" />
      </div>
      <div className="right">
        <h1>{busname}</h1>
        <p>{`To: ${to}`}</p>
      </div>
    </div>
  );
};

export default PopularRoutes;
