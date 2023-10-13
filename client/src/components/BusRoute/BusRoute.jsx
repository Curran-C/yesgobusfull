import { useState, useEffect } from "react";
import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";
import axios from "axios";

const BusRoute = ({
  locationOne,
  locationTwo,
  departureDate,
  returnDate,
  onSearch,
}) => {
  const [locationOneSuggestions, setLocationOneSuggestions] = useState([]);
  const [locationTwoSuggestions, setLocationTwoSuggestions] = useState([]);
  const [sourceCity, setSourceCity] = useState(locationOne);
  const [destinationCity, setDestinationCity] = useState(locationTwo);
  
  const fetchLocationSuggestions = async (query, setLocationSuggestions) => {
    try {
      if (query.length > 3) {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/searchCity/${query}`
        );
        console.log(response.data);
        setLocationSuggestions(response.data.data);
      } else {
        setLocationSuggestions([]);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    if (locationOne) {
      fetchLocationSuggestions(locationOne, setLocationOneSuggestions);
    }
    if (locationTwo) {
      fetchLocationSuggestions(locationTwo, setLocationTwoSuggestions);
    }
  }, [locationOne, locationTwo]);

  return (
    <div className="BusRoute">
      <BusRouteCard
        title="From"
        location={sourceCity}
        setLocation={(value) => onSearch(value, locationTwo, departureDate)}
        suggestions={locationOneSuggestions}
      />
      <img
        src={twowayarrow}
        alt="reverse routes"
        className="reverse-img"
        onClick={({ target: image }) => {
          const currentRotation =
            getComputedStyle(image).getPropertyValue("transform");

          if (currentRotation === "none") {
            image.style.transform = "rotate(180deg)";
          } else {
            image.style.transform = "";
          }
          setDestinationCity(locationOne);
          setSourceCity(locationTwo);
          console.log(sourceCity);
          onSearch(locationTwo, locationOne, departureDate);
        }}
      />
      <BusRouteCard
        title="To"
        location={destinationCity}
        setLocation={(value) => onSearch(locationOne, value, departureDate)}
        suggestions={locationTwoSuggestions}
      />
      <BusRouteCard
        title="Select Date"
        location={departureDate}
        setLocation={(value) => onSearch(locationOne, locationTwo, value)}
        date={true}
      />
      <Button
        text={"Search"}
        onClicked={() => onSearch(locationOne, locationTwo, departureDate)}
      />
    </div>
  );
};

export default BusRoute;
