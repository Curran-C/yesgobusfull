import {
  bus,
  bus1,
  bus2,
  bus3,
  bus4,
  bus5,
  bus6,
  calender,
  copy,
  disabled,
  fromto,
  heroimage,
  mic,
  offer1,
  office,
  ticket,
  wifi,
} from "../../assets/homepage";
import {
  Navbar,
  Button,
  InfoCard,
  Title,
  OffersCard,
  PopularRoutes,
} from "../../components";
import "./landingPage.scss";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Navbar />
      <div className="hero">
        <img src={heroimage} alt="" className="heroImg" />
        <div className="heroContainer">
          <div className="title">
            <h1>PROVIDING QUALITY SERVICES AT</h1>
            <h1>AFFORDABLE PRICES</h1>
          </div>

          <h2>
            India’s largest online bus ticketing platform, trusted by over 6
            million Indians.
          </h2>
          <div className="border">
            <InfoCard img={office} title={"Mysore"} subtitle={"From"} />
            <img src={fromto} alt="" />
            <InfoCard
              img={office}
              title={"Bangalore"}
              subtitle={"Destination"}
            />
            <img src={mic} alt="" />
            <InfoCard
              img={calender}
              title={"02 Jun"}
              subtitle={"Select Date"}
            />
            <InfoCard
              img={calender}
              title={"- - -"}
              subtitle={"Return Optional"}
            />

            <div className="buttons">
              <Button text={"Today"} />
              <Button text={"Tomorrow"} />
            </div>

            <Button text={"Search"} />
          </div>
        </div>
      </div>

      <div className="popularBusTicket">
        <Title title={"Popular Bus Ticket"} />
        <div className="wrapper">
          <InfoCard
            img={wifi}
            title={"Free Wifi"}
            subtitle={"All buses are  equipped with WI-FI and sockets"}
          />
          <InfoCard
            img={bus}
            title={"SHUTTLE TO THE BUS"}
            subtitle={"Free Taxi On The Bus"}
          />
          <InfoCard
            img={disabled}
            title={"COMFORTABLE SEATS"}
            subtitle={
              "You can spend 12 hours without any discomfort in our seats"
            }
          />
          <InfoCard
            img={ticket}
            title={"BUY TICKETS EASILY"}
            subtitle={"Cash, visa, Master card"}
          />
        </div>
      </div>

      <div className="exclusiveOffers">
        <Title title={"Exclusive Offers"} subtitle={"view more"} />
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

      <div className="govBuses">
        <Title title={"Government Buses"} subtitle={"view more"} />
        <div className="govBusesContainer">
          <InfoCard img={bus1} subtitle={"APSRTC"} />
          <InfoCard img={bus2} subtitle={"KSRTC"} />
          <InfoCard img={bus3} subtitle={"TSRTC"} />
          <InfoCard img={bus4} subtitle={"HRTC"} />
          <InfoCard img={bus5} subtitle={"MSRTC"} />
          <InfoCard img={bus6} subtitle={"KSRTC"} />
        </div>
      </div>

      <div className="popularBusRoutes">
        <Title title={"Popular Bus Routes"} subtitle={"View More"} />

        <div className="popularBusRoutesContainer">

            <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
            <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
            <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
            <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
            <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />

        </div>
      </div>
    </div>
  );
};
export default LandingPage;
