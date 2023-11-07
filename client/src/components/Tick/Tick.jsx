import { tick } from "../../assets/homepage";
import "./Tick.scss";

const Tick = ({ text }) => {
  return (
    <div className="tick">
      <img src={tick} alt="" />
      <span className="tickText">{text}</span>
    </div>
  );
};

export default Tick;
