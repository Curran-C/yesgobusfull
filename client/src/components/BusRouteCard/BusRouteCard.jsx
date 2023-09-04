import "./BusRouteCard.scss";

const BusRouteCard = ({ title, location, setLocation, date }) => {
  return (
    <div className="BusRouteCard">
      <p>{title}</p>

      {date ? (
        <input
          type="date"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      ) : (
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      )}
    </div>
  );
};

export default BusRouteCard;
