import "./Payment.scss";
import {
  BusBookingCard,
  BusRoute,
  Navbar,
  RoutesTitle,
  BusBookingCardInfo,
  SimpleCard,
  Input,
  Title,
  PopularRoutes,
  Footer,
  Button,
} from "../../components";
import { livelocation } from "../../assets/busbooking";
import AboveFooterImages from "../../components/AboveFooterImages/AboveFooterImages";
import { offer } from "../../assets/payment";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const sourceCity = queryParams.get("sourceCity");
  const destinationCity = queryParams.get("destinationCity");
  const routeScheduleId = queryParams.get("routeScheduleId");
  const inventoryType = queryParams.get("inventoryType");
  const doj = queryParams.get("doj");
  const pickUpTime = queryParams.get("pickUpTime");
  const reachTime = queryParams.get("reachTime");
  const travelTime = queryParams.get("travelTime");
  const busType = queryParams.get("busType");
  const busName = queryParams.get("busName");
  const price = queryParams.get("price");
  // to be removed
  const priceArray = price.split(" - ");
  console.log(priceArray);
  const tax = parseInt(priceArray[0]) * 0.18;
  const totalAmount = parseInt(priceArray[0]) + tax;

  const date = new Date();
  const handlePayment = async () => {
    console.log(userData);
    try {
      const requestBody = {
        sourceCity: sourceCity,
        destinationCity: destinationCity,
        doj: doj,
        routeScheduleId: routeScheduleId,
        customerName: userData.fullName,
        customerLastName: userData.fullName,
        customerEmail: userData.email,
        customerPhone: userData.mobile,
        // customerGender: userData.gender,
        customerAge: userData.age,
        emergencyPhNumber: userData.alternativeNumber,
        totalAmount: parseInt(totalAmount),
      };
      
      const bookResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/bookBus`,
        requestBody
      );
      // if (bookResponse.status === 200) alert("Bookin");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
        {
          amount: parseInt(totalAmount),
          redirectUrl: `https://yesgobus.com/busbooking/payment/success`,
        }
      );
      window.location.replace(
        response.data.data.instrumentResponse.redirectInfo.url
      );
    } catch (error) {
      console.log(error);
      console.error("omething went wrong:", error);
    }
  }

  const handleInputChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="Payment">
      <Navbar />
      <BusRoute
        locationOne={sourceCity}
        locationTwo={destinationCity}
        departureDate={pickUpTime}
        returnDate={"- - -"}
      />

      <div className="container">
        <div className="containerleft">
          <h5>Review your booking</h5>
          <RoutesTitle
            locationOne={sourceCity}
            locationTwo={destinationCity}
            date={doj}
          />

          <div className="reviewsCard">
            <div className="reviewleft">
              <BusBookingCardInfo
                title={busName}
                subtitle={busType}
                rating={5}
                reviews={100}
              />
              <div className="to">
                <BusBookingCardInfo title={sourceCity} subtitle={pickUpTime} />
                <BusBookingCardInfo img={true} subtitle={travelTime} />
                <BusBookingCardInfo title={destinationCity} subtitle={reachTime} />
              </div>
              <div className="liveLocation">
                <img src={livelocation} alt="" />
                <span>Live tracking</span>
              </div>
            </div>
            <div className="reviewright">
              <span>1 Seat Selected</span>
              <span>Seat No: E 05</span>
              <a href="">View Policies</a>
            </div>
          </div>

          <div className="destinations">
            <SimpleCard
              text={"Boaring Pass Details"}
              date={date.toDateString()}
              locationOne={"Infosys Gate"}
              locationTwo={"INFOSYS GATE NO 2,134,33"}
            />
            <SimpleCard
              text={"Drop Point Details"}
              date={date.toDateString()}
              locationOne={"Hcross"}
              locationTwo={"Hcross Highway, bng"}
            />
          </div>

          {/* Traveller details */}
          <div className="details">
            <span>Enter Traveller Details</span>
            <div className="detailsContainer">
              <Input
                title={"Full Name"}
                type={"text"}
                placeholder={"Full name"}
                onChanged={handleInputChange}
                givenName={"fullName"}
              />
              <Input title={"Age"} type={"number"} placeholder={"40"} 
              onChanged={handleInputChange}
              givenName={"age"}
              />
              {/* <Input title={"Age"} type={"number"} placeholder={"40"} /> */}
              {/* <Input
                title={"Gender"}
                type={"text"}
                placeholder={"Male / Female / Other"}
              /> */}
              <div className="genderContainer">
                <label htmlFor="gender">Gender</label>
                <select name="" id="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="details">
            <span>Enter Contact Details</span>
            <div className="detailsContainer">
              <Input
                title={"Email"}
                type={"text"}
                placeholder={"example@email.com"}
                onChanged={handleInputChange}
                givenName={"email"}
              />
              <Input
                title={"Mobile Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"mobile"}
              />
              <Input
                title={"Altername Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"alternativeNumber"}
              />
            </div>
          </div>

          {/* Picode Details */}
          {/* <div className="details">
            <span>Enter Contact Details</span>
            <div className="detailsContainer">
              <Input title={"Pincode"} type={"number"} placeholder={"560"} />
              <Input title={"State"} type={"text"} placeholder={"Karnataka"} />
              <Input
                title={"Address"}
                type={"text"}
                placeholder={"Address (optional)"}
              />
            </div>
          </div> */}

          {/* Trip Type */}
          {/* <div className="tripType">
            <span>Trip Type</span>
            <hr />
            <div className="checks">
              <div>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="checkOne"
                />
                <label htmlFor="checkOne">Personal</label>
              </div>
              <div>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="checkTwo"
                />
                <label htmlFor="checkTwo">Business</label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="containerright">
          <div className="paymentCard">
            <h2>Price</h2>
            <hr />
            <div className="prices">
              <div className="price">
                <p>Total Basefare</p>
                <p>{"₹"+priceArray[0]}</p>
              </div>
              <hr />
              <div className="price">
                <p>Tax</p>
                <p>{tax}</p>
              </div>
              <hr />
              <div className="price">
                <p>Total Basefare</p>
                <p>{totalAmount}</p>
              </div>
              <hr />
            </div>
          </div>

          {/* <div className="paymentCard">
            <h2>OFFERS</h2>
            <div className="promo">
              <div className="heading">
                <img src={offer} alt="" />
                <p>Enter Promo Code</p>
              </div>
              <hr />
              <input type="text" name="" id="" placeholder="Enter your code" />
            </div>
          </div> */}
          <Button text={`Pay Amount ₹${totalAmount}`} onClicked={handlePayment} />
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
      <Footer />
    </div>
  );
};

export default Payment;
