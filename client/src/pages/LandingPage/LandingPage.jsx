import {
  applestore,
  blacklogo,
  bus,
  bus1,
  bus2,
  bus3,
  bus4,
  bus5,
  bus6,
  calender,
  copy,
  custcare,
  disabled,
  fb,
  filledticket,
  fromto,
  heroimage,
  insta,
  linkedin,
  mastercard,
  mic,
  offer1,
  office,
  orangeBus,
  playstore,
  routes,
  rupay,
  smile,
  ticket,
  twitter,
  visa,
  wifi,
} from "../../assets/homepage";

import {
  Navbar,
  Button,
  InfoCard,
  Title,
  OffersCard,
  PopularRoutes,
  ReviewCard,
  TitleAndText,
  Footer,
} from "../../components";
import AboveFooterImages from "../../components/AboveFooterImages/AboveFooterImages";
import "./landingPage.scss";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/service";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  currentDate = `${year}-${month}-${day}`;

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [locationOneSuggestions, setLocationOneSuggestions] = useState([]);
  const [locationTwoSuggestions, setLocationTwoSuggestions] = useState([]);

  const [dateSource, setDateSource] = useState("input");
  const [todayHighlighted, setTodayHighlighted] = useState(false);
  const [tomorrowHighlighted, setTomorrowHighlighted] = useState(false);

  const handleDateInputChange = (date) => {
    setSelectedDate(date);
    setDateSource("input");
    setTodayHighlighted(false);
    setTomorrowHighlighted(false);
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setSelectedDate(todayFormatted);
    setDateSource("today");
    setTodayHighlighted(true);
    setTomorrowHighlighted(false);
  };

  const handleTomorrowButtonClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = `${tomorrow.getFullYear()}-${String(
      tomorrow.getMonth() + 1
    ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
    setSelectedDate(tomorrowFormatted);
    setDateSource("tomorrow");
    setTomorrowHighlighted(true);
    setTodayHighlighted(false);
  };

  const handleSearchClick = () => {
    navigate(
      `/busbooking?from=${fromLocation}&to=${toLocation}&date=${selectedDate}`
    );
  };

  const fetchLocationSuggestions = async (query, setLocationSuggestions) => {
    try {
      // if (query.length > 3) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/searchCity/${query}`
      );
      setLocationSuggestions(response.data.data);
      // } else {
      //   setLocationSuggestions([]);
      // }
    } catch (error) {
      console.error("omething went wrong:", error);
    }
  };

  useEffect(() => {
    if (fromLocation) {
      fetchLocationSuggestions(fromLocation, setLocationOneSuggestions);
    }
    if (toLocation) {
      fetchLocationSuggestions(toLocation, setLocationTwoSuggestions);
    }
  }, [fromLocation, toLocation]);

  return (
    <div className="landingPage">
      <Navbar page={"home"} />
      <div className="hero" style={{ maxHeight: "90vh" }}>
        <img
          src={heroimage}
          alt=""
          className="heroImg"
          style={{ maxHeight: "90vh" }}
        />
        <div className="heroContainer">
          <div className="title">
            <h1>PROVIDING QUALITY SERVICES AT</h1>
            <h1>AFFORDABLE PRICES</h1>
          </div>

          <h2>
            India’s largest online bus ticketing platform, trusted by over 6
            million Indians.
          </h2>
          <div className="bus-search-container">
            <InfoCard
              // img={office}
              title={fromLocation}
              // subtitle={"From"}
              label="From"
              inputField={true}
              onChanged={setFromLocation}
              suggestions={locationOneSuggestions}
              placeholder={"Departure"}
            />
            <img
              src={fromto}
              alt="reverse route"
              className="reverse-image"
              onClick={({ target: image }) => {
                const currentRotation =
                  getComputedStyle(image).getPropertyValue("transform");

                if (currentRotation === "none") {
                  image.style.transform = "rotate(180deg)";
                } else {
                  image.style.transform = "";
                }
                setFromLocation(toLocation);
                setToLocation(fromLocation);
              }}
            />
            <InfoCard
              // img={office}
              title={toLocation}
              label="To"
              // subtitle={"Destination"}
              inputField={true}
              onChanged={setToLocation}
              suggestions={locationTwoSuggestions}
              placeholder={"Destination"}
            />
            {/* <img src={mic} alt="" /> */}
            <InfoCard
              // img={calender}
              title={selectedDate}
              // subtitle={"Select Date"}
              date={true}
              label="Date"
              inputField={true}
              onChanged={handleDateInputChange}
            />
            {/* <InfoCard
              img={calender}
              title={"- - -"}
              subtitle={"Return Optional"}
            /> */}
            {/* <div className="buttons">
              <button
                onClick={handleTodayButtonClick}
                className={
                  todayHighlighted ? "dayButton highlighted" : "dayButton"
                }
              >
                Today
              </button>
              <button
                onClick={handleTomorrowButtonClick}
                className={
                  tomorrowHighlighted ? "dayButton highlighted" : "dayButton"
                }
              >
                Tomorrow
              </button>
            </div> */}
            <Button
              className="search-btn"
              text={"Search"}
              onClicked={handleSearchClick}
            />
          </div>
        </div>
      </div>

      <div className="popularBusTicket">
        <Title title={"Popular Bus Ticket"} />
        <div className="wrapper">
          {/* <InfoCard
            img={wifi}
            title={"FREE WIFI"}
            subtitle={"We have buses equipped with Wi-Fi and sockets"}
          /> */}
          <InfoCard
            img={bus}
            title={"CONVENIENT Booking"}
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
            subtitle={"UPI, Bank Payments, Visa, MasterCards, etc..."}
          />
        </div>
      </div>

      {/* <div className="exclusiveOffers">
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
      </div> */}

      {/* <div className="govBuses">
        <Title title={"Government Buses"} subtitle={"view more"} />
        <div className="govBusesContainer">
          <InfoCard img={bus1} subtitle={"APSRTC"} />
          <InfoCard img={bus2} subtitle={"KSRTC"} />
          <InfoCard img={bus3} subtitle={"TSRTC"} />
          <InfoCard img={bus4} subtitle={"HRTC"} />
          <InfoCard img={bus5} subtitle={"MSRTC"} />
          <InfoCard img={bus6} subtitle={"KSRTC"} />
        </div>
      </div> */}

      {/* <div className="popularBusRoutes">
        <Title title={"Popular Bus Routes"} subtitle={"View More"} />

        <div className="popularBusRoutesContainer">
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
        </div>
      </div> */}

      <div className="whyChooseYesGoBus">
        <Title title={"Why YesGoBus For Bus Booking"} />
        <div className="whyChooseYesGoBusContainer">
          <InfoCard img={routes} title={"10000+"} subtitle={"Routes"} />
          <InfoCard img={orangeBus} title={"3500+"} subtitle={"BUS PARTNERS"} />
          <InfoCard
            img={filledticket}
            title={"30 SEC"}
            subtitle={"routeINSTANT E-TICKET & REFUND"}
          />
          <InfoCard
            img={smile}
            title={"1 million"}
            subtitle={"HAPPY CUSTOMERS"}
          />
          <InfoCard
            img={custcare}
            title={"24/7"}
            subtitle={"CUSTOMER SUPPORT"}
          />
        </div>
      </div>

      {/* <div className="customerReviews">
        <Title title={"Customer Reviews"} subtitle={"View More"} />
        <div className="customerReviewsContainer">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div> */}

      <div className="about">
        <TitleAndText
          title={"Book Your Bus Ticket with Us"}
          textOne={
            "Embark on a hassle-free journey by booking your bus ticket with us. Our reliable and user-friendly platform offers you the convenience of reserving your seat from the comfort of your own home. Whether you're planning a solo adventure, a family vacation, or a business trip, we've got you covered. With a wide network of routes and destinations, you can choose the bus that perfectly suits your schedule and preferences. Say goodbye to long queues and last-minute rushes – with our easy-to-navigate website or mobile app, securing your bus ticket is just a few clicks away. Our commitment to safety, punctuality, and exceptional service ensures that you'll experience a seamless travel experience from start to finish."
          }
          textTwo={
            "When you book your bus ticket with us, you're not just purchasing a ride – you're investing in a journey filled with comfort and reliability. Our fleet of modern buses is equipped with state-of-the-art amenities, ensuring your comfort throughout the ride. Whether it's spacious seating, onboard entertainment, or clean restrooms, we prioritize your satisfaction at every step. Our transparent pricing and flexible options allow you to find the best deals that align with your budget. With dedicated customer support available around the clock, any inquiries or changes to your travel plans can be easily addressed. So, why wait in line or stress about your travel arrangements? Secure your bus ticket with us today and get ready to embark on a memorable journey that's as enjoyable as the destination itself."
          }
        />

        <TitleAndText
          title={"Why choose us for Bus Booking?"}
          textOne={
            "Choosing us for your bus booking needs is a decision rooted in reliability and convenience. Our years of experience in the industry have enabled us to establish a reputation for seamless service. When you choose us, you're opting for a booking platform that values your time and understands your travel requirements. Our intuitive interface simplifies the booking process, allowing you to quickly search for available routes, compare prices, and select the most suitable options. With real-time updates on bus schedules and availability, you can plan your journey with confidence, knowing that your travel arrangements are in capable hands."
          }
          textTwo={
            "Choosing us for your bus booking needs is a decision rooted in reliability and convenience. Our years of experience in the industry have enabled us to establish a reputation for seamless service. When you choose us, you're opting for a booking platform that values your time and understands your travel requirements. Our intuitive interface simplifies the booking process, allowing you to quickly search for available routes, compare prices, and select the most suitable options. With real-time updates on bus schedules and availability, you can plan your journey with confidence, knowing that your travel arrangements are in capable hands."
          }
        />

        {/* <TitleAndText
          title={"Online Bus Ticket Booking at Lowest Price"}
          textOne={
            "Experience the joy of online bus ticket booking at the lowest price with us. We understand the importance of stretching your travel budget, and that's why we're dedicated to offering you the best deals without compromising on quality. Our platform showcases a range of options that cater to different budgets, allowing you to find the perfect balance between affordability and comfort. With our user-friendly interface, you can easily compare prices, routes, and amenities, ensuring you secure the most cost-effective journey for your needs."
          }
          textTwo={
            "When you choose us for online bus ticket booking, you're choosing a partner committed to delivering value. Our partnerships with a wide network of bus operators enable us to negotiate competitive prices that you won't find elsewhere. Through our transparent pricing model, you can be confident that the price you see is the price you pay – no hidden fees or surprises. Your quest for the lowest price doesn't mean compromising on quality; we collaborate with reputable bus providers to ensure your safety and comfort throughout your voyage. Experience the satisfaction of making smart travel decisions by booking your bus tickets at the lowest price through our platform."
          }
          seen={"seen"}
        /> */}
      </div>

      {/* <div className="aboveFooter">
        <img src={blacklogo} alt="" />
        <AboveFooterImages
          images={[visa, mastercard, rupay]}
          title={"PAY SECURELY BY"}
        />
        <hr style={{ borderLeft: "2px solid lightgray", height: "100px" }} />

        <div className="reachUs">
          <span>Reach Us</span>
          <p>For any query Please email us questions?</p>
          <a href="">xxxxxxxxxx@gmail.com</a>
        </div>
        <hr style={{ borderLeft: "2px solid lightgray", height: "100px" }} />
        <AboveFooterImages
          images={[playstore, applestore]}
          title={"DOWNLOAD THE APP NOW"}
        />
        <hr style={{ borderLeft: "2px solid lightgray", height: "100px" }} />

        <AboveFooterImages
          images={[fb, insta, twitter, linkedin]}
          title={"FOLLOW US ON"}
        />
      </div> */}
      <Footer />
    </div>
  );
};
export default LandingPage;
