import { star } from "../../assets/homepage";
import "./Rating.scss";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <img className="star" src={star} alt="" />
      <p className="rate">{rating}</p>
    </div>
  );
};

export default Rating;
