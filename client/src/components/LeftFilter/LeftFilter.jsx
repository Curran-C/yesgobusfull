import "./LeftFilter.scss";
import LeftFilterBox from "../LeftFilterBox/LeftFilterBox";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const LeftFilter = () => {
  const [range, setRange] = useState([50, 150]);

  const handleSliderChange = (event, newRange) => {
    setRange(newRange);
  };

  return (
    <div className="leftFilter">
      <h4>Filter</h4>
      <div className="filters">
        <LeftFilterBox
          title={"Price Drop"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Deals & Offers"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Free Cancellation"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Safety Feature"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Boarding Points"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Drop Points"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <LeftFilterBox
          title={"Bus Partner"}
          points={["1", "2", "3"]}
          count={[12, 16, 78]}
        />
        <div className="priceRange">
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={range}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={200}
            step={1}
          />
          <div className="range-labels">
            <span>₹ {range[0]}</span>
            <span>₹ {range[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftFilter;
