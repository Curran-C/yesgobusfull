import "./PickUpAndDropPoints.scss";

const PickUpAndDropPoints = ({
  time,
  locationOne,
  locationTwo,
  onClick,
  highlight,
}) => {
  return (
    <div
      className="PickUpAndDropPoints"
      style={{
        backgroundColor: highlight ? "lightgrey" : "white",
      }}
      onClick={onClick}
    >
      <p>{time}</p>
      <span className="locationOne">{locationOne}</span>
      <span className="locationTwo">{locationTwo}</span>
    </div>
  );
};

export default PickUpAndDropPoints;
