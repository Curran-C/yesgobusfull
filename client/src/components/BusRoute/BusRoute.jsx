import { useState, useEffect } from "react";
import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";
import axios from "axios";

const BusRoute = ({ locationOne, locationTwo, departureDate, returnDate, onSearch }) => {
  const [LocationOne, setLocationOne] = useState(locationOne);
  const [LocationTwo, setLocationTwo] = useState(locationTwo);
  const [DepartureDate, setDepartureDate] = useState(departureDate);
  const [ReturnDate, setReturnDate] = useState(returnDate);

  const [locationOneSuggestions, setLocationOneSuggestions] = useState([]);
  const [locationTwoSuggestions, setLocationTwoSuggestions] = useState([]);

  const handleSearch = () => {
    onSearch(LocationOne, LocationTwo, DepartureDate);
  };

  const fetchLocationSuggestions = async (query, setLocationSuggestions) => {
    try {
      if (query.length > 3) {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/searchCity/${query}`);
        console.log(response.data);
        setLocationSuggestions(response.data.data);
      } else {
        setLocationSuggestions([]);
      }
    } catch (error) {
      console.error("omething went wrong:", error);
    }
  };

  useEffect(() => {
    if (LocationOne) {
      fetchLocationSuggestions(LocationOne, setLocationOneSuggestions);
    }
    if (LocationTwo) {
      fetchLocationSuggestions(LocationTwo, setLocationTwoSuggestions);
    }
  }, [LocationOne, LocationTwo]);

  return (
    <div className="BusRoute">
      <BusRouteCard
        title="From"
        location={LocationOne}
        setLocation={setLocationOne}
        suggestions={locationOneSuggestions}
      />
      <img src={twowayarrow} alt="" />
      <BusRouteCard
        title="To"
        location={LocationTwo}
        setLocation={setLocationTwo}
        suggestions={locationTwoSuggestions}
      />
      <BusRouteCard
        title="Select Date"
        location={DepartureDate}
        setLocation={setDepartureDate}
        date={true}
      />
      {/* <BusRouteCard
        title="Return Optional"
        location={ReturnDate}
        setLocation={setReturnDate}
        date={true}
      /> */}
      <Button text={"Search"} onClicked={handleSearch} />
    </div>
  );
};

export default BusRoute;
