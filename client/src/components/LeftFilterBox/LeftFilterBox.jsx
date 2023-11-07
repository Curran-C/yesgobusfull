import { useEffect, useState } from "react";
import { downarrow } from "../../assets/busbooking";
import "./LeftFilterBox.scss";

const LeftFilterBox = ({ title, points, count, name, onFilterChange, filters, sourceCity, destinationCity }) => {
  const [showPoints, setShowPoints] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);

  useEffect(() => {
    setSelectedPoints(filters || []);
  }, [filters]);

  const displayLocation = (location) => {
    const maxLength = 30;
    if (location.length > maxLength) {
      return location.substring(0, maxLength) + "...";
    } else {
      return location;
    }
  };

  const handleCheckboxChange = (point) => {
    const updatedFilters = selectedPoints.includes(point)
      ? selectedPoints.filter((filter) => filter !== point)
      : [...selectedPoints, point];

    setSelectedPoints(updatedFilters);
    onFilterChange(name, updatedFilters);
  };

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
              <div className="filterTypes" key={index}>
                <div className="types">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(point)}
                    checked={selectedPoints.includes(point)}
                  />
                  <p>{displayLocation(point)}</p>
                </div>
                {/* <p>({count[index]})</p> */}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeftFilterBox;
