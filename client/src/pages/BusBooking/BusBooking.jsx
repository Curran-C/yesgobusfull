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
import { useState } from "react";

const BusBooking = () => {
  const [noOfBuses, setNoOfBuses] = useState(150);

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
  console.log(dates);

  return (
    <div className="busBooking">
      <Navbar />
      <BusRoute
        locationOne={"Mysore"}
        locationTwo={"Bangalore"}
        departureDate={"03 Jun"}
        returnDate={"- - -"}
      />
      <div className="container">
        <div className="left">
          <LeftFilter />
        </div>

        <div className="right">
          <div className="dates">
            {dates.map((date) => (
              <p className="date">{date}</p>
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

          <div className="wrapper">
            <RoutesTitle
              locationOne={"Bangalore"}
              locationTwo={"Mangalore"}
              date={date.toDateString()}
            />
            <ColumnNames noOfBuses={noOfBuses} />

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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBooking;
