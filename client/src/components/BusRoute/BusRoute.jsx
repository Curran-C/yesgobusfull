import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";

const BusRoute = ({ locationOne, locationTwo, departureDate, returnDate }) => {
  return (
    <div className="BusRoute">
      <BusRouteCard title="From" location={locationOne} />
      <img src={twowayarrow} alt="" />
      <BusRouteCard title="To" location={locationTwo} />
      <BusRouteCard title="Selected Date" location={departureDate} />
      <BusRouteCard title="Selected Date" location={departureDate} />
      <BusRouteCard title="Return Optional" location={returnDate} />
      <Button text={"Search"} />
    </div>
  );
};

export default BusRoute;
