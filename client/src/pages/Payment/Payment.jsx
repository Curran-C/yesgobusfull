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
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { bookSeat } from "../../../../api/service/buBooking.service";

const Payment = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const [userData, setUserData] = useState({
    gender: "M",
    idType: "PAN",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sourceCity,
    destinationCity,
    routeScheduleId,
    inventoryType,
    doj,
    pickUpTime,
    reachTime,
    travelTime,
    busType,
    busName,
    bookingDetails,
  } = location.state || {};
  const [executed, setExecuted] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const blockTicketId = urlSearchParams.get("blockTicketId");
  useEffect(() => {
    const checkBlockTicketId = async () => {
      if (blockTicketId && !executed) {
        // alert(`Block Ticket ID: ${blockTicketId}`);
        const bookSeat = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/bookSeat/${blockTicketId}`
        );
        console.log(bookSeat.data);
        setExecuted(true);
        if (bookSeat.data.status === "success") {
          navigate(`/busbooking/payment/success?tlid=${bookSeat.data.BookingDetail.etstnumber}&userId=${loggedInUser._id}`);
        } else {
          navigate("/busbooking/payment/failure");
        }
      }
    };
    checkBlockTicketId();
  }, [executed, blockTicketId]);


  const date = new Date();
  const handlePayment = async () => {
    console.log(userData);
    const seatObjects = bookingDetails?.selectedSeats?.map((seatId, index) => {
      return {
        seatNbr: seatId,
        ladiesSeat: bookingDetails?.ladiesSeat[index],
        ac: bookingDetails?.ac[index],
        sleeper: bookingDetails?.sleeper[index],
        fare: bookingDetails?.seatFares[index],
        totalFareWithTaxes: bookingDetails?.seatTotalFares[index],
        name: userData.firstName,
        age: userData.age,
        sex: userData.gender,
        lastName: userData.lastName,
        mobile: userData.mobile,
        title: " ",
        email: userData.email,
        idType: userData.idType,
        idNumber: userData.idNumber,
        nameOnId: userData.firstName,
        primary: true,
      };
    });
    try {
      const blockSeatRequestBody = {
        sourceCity: sourceCity,
        destinationCity: destinationCity,
        doj: doj,
        routeScheduleId: routeScheduleId,
        boardingPoint: bookingDetails?.boardingPoint,
        customerName: userData.firstName,
        customerLastName: userData.lastName,
        customerEmail: userData.email,
        customerPhone: userData.mobile,
        emergencyPhNumber: userData.alternativeNumber,
        customerAddress: userData.address,
        blockSeatPaxDetails: seatObjects,
        inventoryType: inventoryType,
      };
      const blockSeat = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/blockSeat`,
        blockSeatRequestBody
      );
      if (blockSeat?.data?.apiStatus?.success === true) {
        const bookResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/bookBus`,
          {
            ...blockSeatRequestBody,
            userId: loggedInUser._id,
            totalAmout: bookingDetails?.totalFare
          }
        );
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
          {
            amount: parseInt(Math.ceil(bookingDetails?.totalFare)),
            redirectUrl: `${window.location.href}?blockTicketId=${blockSeat.blockTicketKey}`,
            // redirectUrl: `${window.location.href}?blockTicketId=ETS0S232144038`,
          }
        );
        window.location.replace(
          response.data.data.instrumentResponse.redirectInfo.url
        );
      } else {
        alert("Error blocking seat");
      }

    } catch (error) {
      console.log(error);
      console.error("Something went wrong:", error);
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
        departureDate={doj}
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
              <span>{bookingDetails?.selectedSeats?.length} Seat Selected</span>
              <span>{bookingDetails?.selectedSeats?.join(', ')}</span>
              <a href="">View Policies</a>
            </div>
          </div>

          <div className="destinations">
            <SimpleCard
              text={"Boaring Pass Details"}
              date={bookingDetails?.boardingPoint?.time}
              // locationOne={bookingDetails.boardingPoint.location}
              locationTwo={bookingDetails?.boardingPoint?.location}
            />
            <SimpleCard
              text={"Drop Point Details"}
              date={bookingDetails?.droppingPoint?.time}
              // locationOne={bookingDetails.droppingPoint.location}
              locationTwo={bookingDetails?.droppingPoint?.location}
            />
          </div>

          {/* Traveller details */}
          <div className="details">
            <span>Enter Traveller Details</span>
            <div className="detailsContainer">
              <Input
                title={"First Name"}
                type={"text"}
                placeholder={"First name"}
                onChanged={handleInputChange}
                givenName={"firstName"}
              />
              <Input
                title={"Last Name"}
                type={"text"}
                placeholder={"Last name"}
                onChanged={handleInputChange}
                givenName={"lastName"}
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
                <select
                  name="gender"
                  id="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
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
              <Input
                title={"Address"}
                type={"text"}
                placeholder={"Address"}
                onChanged={handleInputChange}
                givenName={"address"}
              />
            </div>
          </div>

          {/* Picode Details */}
          <div className="details">
            <span>Enter ID Proof</span>
            <div className="detailsContainer">
              <div className="genderContainer">
                <label htmlFor="gender">ID Type</label>
                <select
                  name="idType"
                  id="idType"
                  value={userData.idType}
                  onChange={handleInputChange}
                >
                  <option value="PAN">Pan</option>
                  <option value="AADHAAR">Aadhaar</option>
                </select>
              </div>
              <Input
                title={"ID Number"}
                type={"text"}
                placeholder={"ID Number"}
                onChanged={handleInputChange}
                givenName={"idNumber"}
              />
              {/* <Input title={"State"} type={"text"} placeholder={"Karnataka"} />
              <Input
                title={"Address"}
                type={"text"}
                placeholder={"Address (optional)"}
              /> */}
            </div>
          </div>

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
                <p>{"₹" + bookingDetails?.fare}</p>
              </div>
              <hr />
              <div className="price">
                <p>Tax</p>
                <p>{bookingDetails?.tax}</p>
              </div>
              <hr />
              <div className="price">
                <p>Total Basefare</p>
                <p>{bookingDetails?.totalFare}</p>
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
          <Button text={`Pay Amount ₹${bookingDetails?.totalFare}`} onClicked={handlePayment} />
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
