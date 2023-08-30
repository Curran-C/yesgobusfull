import "./PickUpAndDropPoints.scss";

const PickUpAndDropPoints = ({ time, locationOne, locationTwo }) => {
  return (
    <div className="PickUpAndDropPoints">
      <p>{time}</p>
      <span className="locationOne">{locationOne}</span>
      <span className="locationTwo">{locationTwo}</span>
    </div>
  );
};

export default PickUpAndDropPoints;
