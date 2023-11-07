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
        fontWeight: highlight ? 700 : "normal",
      }}
      onClick={onClick}
    >
      <p>{time}</p>
      <span
        className="locationOne"
        style={{
          fontWeight: highlight ? 700 : "normal",
        }}
      >
        {locationOne}
      </span>
      <span className="locationTwo">{locationTwo}</span>
    </div>
  );
};

export default PickUpAndDropPoints;
