import { useState } from "react";
import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";

const BusRoute = ({ locationOne, locationTwo, departureDate, returnDate }) => {
  const [LocationOne, setLocationOne] = useState(locationOne);
  const [LocationTwo, setLocationTwo] = useState(locationTwo);
  const [DepartureDate, setDepartureDate] = useState(departureDate);
  const [ReturnDate, setReturnDate] = useState(returnDate);

  return (
    <div className="BusRoute">
      <BusRouteCard
        title="From"
        location={LocationOne}
        setLocation={setLocationOne}
      />
      <img src={twowayarrow} alt="" />
      <BusRouteCard
        title="To"
        location={LocationTwo}
        setLocation={setLocationTwo}
      />
      <BusRouteCard
        title="Selected Date"
        location={DepartureDate}
        setLocation={setDepartureDate}
        date={true}
      />
      <BusRouteCard
        title="Return Optional"
        location={ReturnDate}
        setLocation={setReturnDate}
        date={true}
      />
      <Button text={"Search"} />
    </div>
  );
};

export default BusRoute;
