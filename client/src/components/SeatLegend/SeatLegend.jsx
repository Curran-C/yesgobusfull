import "./SeatLegend.scss";

const SeatLegend = ({ title, img, subtitle }) => {
  return (
    <div className="SeatLegend">
      <span>{title}</span>
      <p className="subtitle">{subtitle}</p>
      <img className="legendImage" src={img} alt="" />
    </div>
  );
};

export default SeatLegend;
