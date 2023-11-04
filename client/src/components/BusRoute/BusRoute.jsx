import { useState, useEffect } from "react";
import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";
import axiosInstance from "../../utils/service";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSourceCity(locationOne);
    setDestinationCity(locationTwo);
  }, [locationOne, locationTwo]);

  const fetchLocationSuggestions = async (query, setLocationSuggestions) => {
    try {
      setLoading(true);
      // if (query.length > 3) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/searchCity/${query}`
      );
      setLocationSuggestions(response.data.data);
      setLoading(false);
      // } else {
      //   setLocationSuggestions([]);
      // }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const [locationOneQuery, setLocationOneQuery] = useState("");
  const [locationTwoQuery, setLocationTwoQuery] = useState("");

  useEffect(() => {
    let debounceTimer;

    const handleQueryChange = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (locationOneQuery) {
          fetchLocationSuggestions(locationOneQuery, setLocationOneSuggestions);
        }
        if (locationTwoQuery) {
          fetchLocationSuggestions(locationTwoQuery, setLocationTwoSuggestions);
        }
      }, 500);
    };

    handleQueryChange();

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [locationOneQuery, locationTwoQuery]);

  return (
    <div className="BusRoute">
      <BusRouteCard
        title="From"
        location={sourceCity}
        setLocation={(value) => onSearch(value, locationTwo, departureDate)}
        suggestions={locationOneSuggestions}
        loading={loading}
        setLocationQuery={setLocationOneQuery}
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
        loading={loading}
        setLocationQuery={setLocationTwoQuery}
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
