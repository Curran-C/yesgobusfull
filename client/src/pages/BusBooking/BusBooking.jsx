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
import { offer1 } from "../../assets/homepage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";

const BusBooking = () => {
  const location = useLocation();
  const [noOfBuses, setNoOfBuses] = useState(0);
  const [busDetails, setBusDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  //pickup
  const pickUpTimes = ["19:00, 4 JUL", "19:00, 4 JUL", "19:00, 4 JUL"];
  const pickUpLocationOne = ["Infosys Gate", "Wipro Gate", "Bus Stand"];
  const pickUpLocationTwo = [
    "INFOSYS GATE NO 2,134,33",
    "Wipro GATE NO 2,134,33",
    "Bus stand NO 2,134,33",
  ];

  //drop
  const dropTimes = ["19:00, 4 JUL", "19:00, 4 JUL", "19:00, 4 JUL"];
  const dropLocationOne = ["Infosys Gate", "Wipro Gate", "Bus Stand"];
  const dropLocationTwo = [
    "INFOSYS GATE NO 2,134,33",
    "Wipro GATE NO 2,134,33",
    "Bus stand NO 2,134,33",
  ];

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

  const [fromLocation, setFromLocation] = useState("Mysore");
  const [toLocation, setToLocation] = useState("Bangalore");
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sourceCity = queryParams.get("from");
    const destinationCity = queryParams.get("to");
    const doj = queryParams.get("date");
    if (sourceCity && destinationCity && doj) {
      handleSearch(sourceCity, destinationCity, doj);
    } else {
      handleSearch("Mysore", "Bangalore", currentDate);
    }
  }, []);

  const handleSearch = async (
    sourceCity,
    destinationCity,
    doj,
    filters,
    returnDate
  ) => {
    setFromLocation(sourceCity);
    setToLocation(destinationCity);
    setSelectedDate(doj);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBusDetails`,
        {
          sourceCity: sourceCity,
          destinationCity: destinationCity,
          doj: doj,
          ...filters,
        }
      );
      setBusDetails(response.data.data);
      setNoOfBuses(response.data.data.length);
    } catch (error) {
      // alert("Something went wrong");
      console.error("omething went wrong:", error);
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

  const tempBusDetails = [
    {
      inventoryType: 1,
      routeScheduleId: "1000295846301600806",
      serviceId: "1000295800001600806",
      fare: "300.00,400.00,410.00,448.00",
      departureTime: "06:45 PM",
      arrivalTime: "10:45 PM",
      availableSeats: 38,
      operatorName: "Jabbar  Travels",
      cancellationPolicy:
        '[{"cutoffTime":"0-8","refundInPercentage":"0"},{"cutoffTime":"8-24","refundInPercentage":"50"},{"cutoffTime":"24-72","refundInPercentage":"75"},{"cutoffTime":"72","refundInPercentage":"90"}]',
      boardingPoints: [
        {
          id: "17954206",
          location: "Infosys",
          time: "06:00 PM",
        },
        {
          id: "17954500",
          location: "Mysore Sabar Bustand",
          time: "06:45 PM",
        },
        {
          id: "17956034",
          location: "JSS Dental College ",
          time: "06:50 PM",
        },
        {
          id: "17743142",
          location: "Columbia Asia Hospital",
          time: "07:00 PM",
        },
        {
          id: "19309401",
          location: "Srirangapatna",
          time: "07:15 PM",
        },
        {
          id: "19309398",
          location: "Mandya",
          time: "07:30 PM",
        },
        {
          id: "23311741",
          location: "Channapatna",
          time: "08:30 PM",
        },
        {
          id: "23311745",
          location: "Ramanagara",
          time: "08:45 PM",
        },
        {
          id: "23311743",
          location: "Bidadi",
          time: "09:00 PM",
        },
      ],
      droppingPoints: [
        {
          id: "18445360",
          location: "Kengeri",
          time: "09:45 PM",
        },
        {
          id: "17801930",
          location: "Electronic City",
          time: "10:30 PM",
        },
        {
          id: "17934463",
          location: "Silkboard ",
          time: "10:40 PM",
        },
        {
          id: "19271277",
          location: "HSR Layout Nandas",
          time: "10:45 PM",
        },
      ],
      busType: "Scania Multi-Axle AC Semi Sleeper (2+2)",
      partialCancellationAllowed: false,
      idProofRequired: false,
      operatorId: 8336,
      commPCT: 4.4,
      mTicketAllowed: true,
      isRTC: false,
      isOpTicketTemplateRequired: false,
      isOpLogoRequired: false,
      isFareUpdateRequired: false,
      is_child_concession: false,
      isGetLayoutByBPDP: false,
      socialDistancing: false,
      durationInMins: 240,
      busAmenities: null,
    },
  ];

 
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
          <div className="dates">
            {dates.map((date) => (
              <p className="date" onClick={() => handleDateFilter(date)}>
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
                  pickUpTimes={pickUpTimes}
                  pickUpLocationOne={bus.boardingPoints}
                  pickUpLocationTwo={pickUpLocationTwo}
                  dropTimes={dropTimes}
                  dropLocationOne={bus.droppingPoints}
                  dropLocationTwo={dropLocationTwo}
                  backSeat={true}
                />
              ))}

              {/* <BusBookingCard
              title={"YesGoBus"}
              busName={"YesGoBus"}
              busType={"TATA A/C Sleeper (2+1)"}
              rating={5}
              noOfReviews={100}
              pickUpLocation={"Bangalore"}
              pickUpTime={"12:00"}
              reachLocation={"Mangalore"}
              reachTime={"13:00"}
              travelTime={"3hr 20min"}
              seatsLeft={"27 seats left"}
              price={800}
              pickUpTimes={pickUpTimes}
              pickUpLocationOne={pickUpLocationOne}
              pickUpLocationTwo={pickUpLocationTwo}
              dropTimes={dropTimes}
              dropLocationOne={dropLocationOne}
              dropLocationTwo={dropLocationTwo}
              noOfRows={4}
              noOfSeatsPerRow={6}
              backSeat={true}
            />

            <BusBookingCard
              title={"YesGoBus"}
              busName={"YesGoBus"}
              busType={"TATA A/C Sleeper (2+1)"}
              rating={5}
              noOfReviews={100}
              pickUpLocation={"Bangalore"}
              pickUpTime={"12:00"}
              reachLocation={"Mangalore"}
              reachTime={"13:00"}
              travelTime={"3hr 20min"}
              seatsLeft={"27 seats left"}
              price={800}
              pickUpTimes={pickUpTimes}
              pickUpLocationOne={pickUpLocationOne}
              pickUpLocationTwo={pickUpLocationTwo}
              dropTimes={dropTimes}
              dropLocationOne={dropLocationOne}
              dropLocationTwo={dropLocationTwo}
              noOfRows={4}
              noOfSeatsPerRow={6}
              backSeat={true}
            />

            <BusBookingCard
              title={"YesGoBus"}
              busName={"YesGoBus"}
              busType={"TATA A/C Sleeper (2+1)"}
              rating={5}
              noOfReviews={100}
              pickUpLocation={"Bangalore"}
              pickUpTime={"12:00"}
              reachLocation={"Mangalore"}
              reachTime={"13:00"}
              travelTime={"3hr 20min"}
              seatsLeft={"27 seats left"}
              price={800}
              pickUpTimes={pickUpTimes}
              pickUpLocationOne={pickUpLocationOne}
              pickUpLocationTwo={pickUpLocationTwo}
              dropTimes={dropTimes}
              dropLocationOne={dropLocationOne}
              dropLocationTwo={dropLocationTwo}
              noOfRows={4}
              noOfSeatsPerRow={6}
              backSeat={true}
            />

            <BusBookingCard
              title={"YesGoBus"}
              busName={"YesGoBus"}
              busType={"TATA A/C Sleeper (2+1)"}
              rating={5}
              noOfReviews={100}
              pickUpLocation={"Bangalore"}
              pickUpTime={"12:00"}
              reachLocation={"Mangalore"}
              reachTime={"13:00"}
              travelTime={"3hr 20min"}
              seatsLeft={"27 seats left"}
              price={800}
              pickUpTimes={pickUpTimes}
              pickUpLocationOne={pickUpLocationOne}
              pickUpLocationTwo={pickUpLocationTwo}
              dropTimes={dropTimes}
              dropLocationOne={dropLocationOne}
              dropLocationTwo={dropLocationTwo}
              noOfRows={4}
              noOfSeatsPerRow={6}
              backSeat={true}
            /> */}
            </div>
          </Spin>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBooking;
