import { useState } from "react";
import "./DropDown.scss";
import { downsunfilledarrow } from "../../assets/busbooking";

const DropDown = ({ title, text }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="DropDown">
      <div
        onClick={() => setShowDropDown(!showDropDown)}
        className="dropdownContainer"
      >
        <p>{title}</p>
        <img src={downsunfilledarrow} alt="" />
      </div>
      <div className="dropdownText">{showDropDown && <p>{text}</p>}</div>
    </div>
  );
};

export default DropDown;
