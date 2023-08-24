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
  const date = new Date();

  const [noOfBuses, setNoOfBuses] = useState(150);

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
          <div className="exclusiveOffers">
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
          </div>

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
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBooking;
