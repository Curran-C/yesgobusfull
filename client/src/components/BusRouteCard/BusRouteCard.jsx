import "./BusRouteCard.scss";

const BusRouteCard = ({ title, location }) => {
  return (
    <div className="BusRouteCard">
      <p>{title}</p>
      <h4>{location}</h4>
    </div>
  );
};

export default BusRouteCard;
