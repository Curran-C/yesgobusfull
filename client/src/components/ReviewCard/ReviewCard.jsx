import Rating from "../Rating/Rating";
import "./ReviewCard.scss";

const ReviewCard = () => {
  return (
    <div className="reviewCard">
      <div className="ratingContainer">
        <Rating rating={"5.0"} />
        <span className="name">Ashish Sonkar</span>
      </div>
      <p>Travelled to Patparganj on 10 Apr 2023 with 4 People.</p>

      <span>
        "Very nice driver very well behaviour and helpful attitude. I personally
        feel good with this driver to this travel."
      </span>
    </div>
  );
};

export default ReviewCard;
