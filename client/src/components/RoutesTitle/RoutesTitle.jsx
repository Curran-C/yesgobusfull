import { useState } from "react";
import { rightarrow } from "../../assets/busbooking";
import "./RoutesTitle.scss";

const RoutesTitle = ({ locationOne, locationTwo, date }) => {
  const [highlighted, setHighlighted] = useState(true);

  return (
    <div className="RoutesTitle">
      <div className="locations">
        <div className="toandfrom">
          <h1>{locationOne}</h1>
          <img src={rightarrow} alt="" />
          <h1>{locationTwo}</h1>
        </div>
        <hr />
        <h3>{date}</h3>
      </div>
      <div className="buttons">
        <button
          onClick={() => setHighlighted(!highlighted)}
          className={highlighted ? "dayButton highlighted" : "dayButton"}
        >
          Today
        </button>
        <button
          onClick={() => setHighlighted(!highlighted)}
          className={!highlighted ? "dayButton highlighted" : "dayButton"}
        >
          Tomorrow
        </button>
      </div>
    </div>
  );
};

export default RoutesTitle;
