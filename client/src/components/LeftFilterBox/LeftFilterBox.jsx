import { useState } from "react";
import { downarrow } from "../../assets/busbooking";
import "./LeftFilterBox.scss";

const LeftFilterBox = ({ title, points, count }) => {
  const [showPoints, setShowPoints] = useState(false);

  return (
    <div className="LeftFilterBox">
      <div className="leftFilterContainer">
        <div onClick={() => setShowPoints(!showPoints)} className="title">
          <p>{title}</p>
          <img src={downarrow} alt="" />
        </div>
        {showPoints && (
          <ul>
            {points?.map((point, index) => (
              <div className="filterTypes">
                <div className="types">
                  <input type="checkbox" />
                  <p>point</p>
                </div>
                <p>({count[index]})</p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeftFilterBox;
