import "./BusBooking.scss";
import {
  Navbar,
  BusRoute,
  LeftFilter,
  OffersCard,
  Title,
  RoutesTitle,
  ColumnNames,
  BusBookingCard,
  Footer,
} from "../../components";
// import {
//   fromto
// } from "../../assets/homepage";
import { offer1 } from "../../assets/homepage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useLocation, Navigate } from "react-router-dom";
import { cityMapping } from "../../utils/cityMapping";

const BusBooking = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();
  const [noOfBuses, setNoOfBuses] = useState(0);
  const [busDetails, setBusDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  //dates
  const date = new Date();
  const dates = [];

  for (let i = 0; i <= 6; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    dates.push(
      nextDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        weekday: "short",
      })
    );
  }

  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  currentDate = `${year}-${month}-${day}`;

  const [fromLocation, setFromLocation] = useState(
    localStorage.getItem("sourceCity") || "Mysore"
  );
  const [toLocation, setToLocation] = useState(
    localStorage.getItem("destinationCity") || "Bangalore"
  );
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // useEffect(() => {
  //   const storedSourceCity = localStorage.getItem("sourceCity") || "Mysore";
  //   const storedDestinationCity = localStorage.getItem("destinationCity") || "Bangalore";
  //   setFromLocation(storedSourceCity);
  //   setToLocation(storedDestinationCity);
  // }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sourceCity = queryParams.get("from");
    const destinationCity = queryParams.get("to");
    const doj = queryParams.get("date");
    if (sourceCity && destinationCity && doj) {
      // the below three set functions of useState are not working
      setFromLocation(sourceCity);
      setToLocation(destinationCity);
      setSelectedDate(doj);
      handleSearch(sourceCity, destinationCity, doj);
    } else {
      handleSearch(fromLocation, toLocation, currentDate);
    }
  }, []);

  const handleSearch = async (
    sourceCity,
    destinationCity,
    doj,
    filters,
    returnDate
  ) => {
    localStorage.setItem("sourceCity", sourceCity);
    localStorage.setItem("destinationCity", destinationCity);
    setFromLocation(sourceCity);
    setToLocation(destinationCity);
    setSelectedDate(doj);
    setLoading(true);
    setNoOfBuses(0);

    let boardingPoints = [];
    if (sourceCity in cityMapping) {
      const mapping = cityMapping[sourceCity];
      sourceCity = mapping.sourceCity;
      boardingPoints = mapping.boardingPoints;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBusDetails`,
        {
          sourceCity: sourceCity,
          destinationCity: destinationCity,
          doj: doj,
          boardingPoints,
          ...filters,
        }
      );
      setBusDetails(response.data.data);
      setNoOfBuses(response.data.data.length);
      setLoading(false);
    } catch (error) {
      // alert("Something went wrong");
      setBusDetails([]);
      setNoOfBuses(0);
      console.error("Something went wrong:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (date) => {
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const parts = date.split(", ");
    const dayMonthYear = parts[1].split(" ");
    const day = parseInt(dayMonthYear[1]);
    const month = monthMap[dayMonthYear[0]];
    const year = parseInt(new Date().getFullYear());
    const newDate = new Date(Date.UTC(year, month, day));
    const formattedDateString = newDate.toISOString().split("T")[0];
    handleSearch(fromLocation, toLocation, formattedDateString);
  };

  const priceToDisplay = (fare) => {
    const prices = fare.split(",").map(parseFloat);
    if (prices.length === 1) {
      return prices[0].toFixed(2);
    } else {
      const minPrice = Math.min(...prices).toFixed(2);
      const maxPrice = Math.max(...prices).toFixed(2);
      return `${minPrice} - ${maxPrice}`;
    }
  };

  const formatTravelTime = (durationInMins) => {
    const hours = Math.floor(durationInMins / 60);
    const minutes = durationInMins % 60;
    const formattedHours = hours > 0 ? `${hours}hr` : "";
    const formattedMinutes = minutes > 0 ? ` ${minutes}min` : "";
    return `${formattedHours}${formattedMinutes}`;
  };

  const handleFilter = (filters) => {
    handleSearch(fromLocation, toLocation, selectedDate, filters);
  };

  const handleDate = (date) => {
    handleSearch(fromLocation, toLocation, date);
  };

  return (
    <div className="busBooking">
      <Navbar />
      <BusRoute
        locationOne={fromLocation}
        locationTwo={toLocation}
        departureDate={selectedDate}
        returnDate={"- - -"}
        onSearch={handleSearch}
      />
      <div className="container">
        <div className="left">
          <LeftFilter
            sourceCity={fromLocation}
            destinationCity={toLocation}
            doj={selectedDate}
            onFilterChange={handleFilter}
          />
        </div>

        <div className="right">
          <div className="mobile-filter">
            <LeftFilter
              sourceCity={fromLocation}
              destinationCity={toLocation}
              doj={selectedDate}
              onFilterChange={handleFilter}
            />
          </div>
          <div className="dates">
            {dates.map((date) => (
              <p
                className={`date ${date === selectedDate ? 'active' : ''}`}
                onClick={() => handleDateFilter(date)}
              >
                {date}
              </p>
            ))}
          </div>
          {/* <div className="exclusiveOffers">
            <Title title={"Offers"} />
            <div className="offers">
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
            </div>
          </div> */}
          <Spin spinning={loading}>
            <div className="wrapper">
              <RoutesTitle
                locationOne={fromLocation}
                locationTwo={toLocation}
                date={selectedDate}
                onDateChange={handleDate}
              />
              <ColumnNames noOfBuses={noOfBuses} />

              {busDetails?.map((bus) => (
                <div className="bus-card-container">
                  <BusBookingCard
                    key={bus.routeScheduleId}
                    routeScheduleId={bus.routeScheduleId}
                    inventoryType={bus.inventoryType}
                    sourceCity={fromLocation}
                    destinationCity={toLocation}
                    doj={selectedDate}
                    title={bus.operatorName}
                    busName={bus.operatorName}
                    busType={bus.busType}
                    rating={5}
                    noOfReviews={100}
                    pickUpLocation={fromLocation}
                    pickUpTime={bus.departureTime}
                    reachLocation={toLocation}
                    reachTime={bus.arrivalTime}
                    travelTime={formatTravelTime(bus.durationInMins)}
                    seatsLeft={bus.availableSeats}
                    price={priceToDisplay(bus.fare)}
                    // pickUpTimes={pickUpTimes}
                    pickUpLocationOne={bus.boardingPoints}
                    // pickUpLocationTwo={pickUpLocationTwo}
                    // dropTimes={dropTimes}
                    dropLocationOne={bus.droppingPoints}
                    // dropLocationTwo={dropLocationTwo}
                    backSeat={true}
                    cancellationPolicy={bus.cancellationPolicy}
                  />
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBooking;
