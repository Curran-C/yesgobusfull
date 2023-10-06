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
import { Spin } from "antd";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const [firstName, lastName] = loggedInUser.fullName.split(" ");

  const [userData, setUserData] = useState({
    // firstName: firstName || "",
    // lastName: lastName || "",
    email: loggedInUser.email || "",
    mobile: loggedInUser.phoneNumber || "",
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
    cancellationPolicy,
  } = location.state || {};
  const [executed, setExecuted] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const blockTicketId = urlSearchParams.get("blockTicketId");
  const bookingId = urlSearchParams.get("bookingId");
  const paymentVerify = new URLSearchParams(location.search).has(
    "paymentVerify"
  );

  //verify payment and book ticket
  useEffect(() => {
    const paymentVerification = async () => {
      setLoading(true);
      // get bookings
      const getBookingDetails = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBookingById/${bookingId}`
      );
      if (getBookingDetails.status === 200) {
        const merchantTransactionId = getBookingDetails?.data?.data.merchantTransactionId;

        // check payment status
        const checkPaymentStatus = await axios.get(
          `${import.meta.env.VITE_BASE_URL
          }/api/payment/checkPaymentStatus/${merchantTransactionId}`
        );

        if (checkPaymentStatus.data.code === "PAYMENT_SUCCESS") {
          console.log(`Block Ticket ID: ${blockTicketId}`);

          // book seat
          const bookSeat = await axios.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/busBooking/bookSeat/${blockTicketId}`
          );

          // if booking is successfull
          if (bookSeat.data.status === "success") {

            // update booking in the db
            const { data: updatePaymentDetails } = await axios.patch(
              `${import.meta.env.VITE_BASE_URL
              }/api/busBooking/updateBooking/${bookingId}`,
              {
                bookingStatus: "paid",
                tid: bookSeat?.data.BookingDetail.etstnumber,
                buspnr: bookSeat?.data.buspnr,
                opPNR: bookSeat?.data.BookingDetail.opPNR,
              }
            );
            if (updatePaymentDetails) {
              // send mail
              const mailBody = {
                fullName: updatePaymentDetails?.data.customerName,
                sourceCity: updatePaymentDetails?.data.sourceCity,
                destinationCity: updatePaymentDetails?.data.destinationCity,
                seats: updatePaymentDetails?.data.selectedSeats,
                amount: updatePaymentDetails?.data.totalAmount,
                pickUpLocation: updatePaymentDetails?.data.boardingPoint.location,
                opPNR: updatePaymentDetails?.data.opPNR,
                doj: formatDate(updatePaymentDetails?.data.doj),
                to: updatePaymentDetails?.data.customerEmail,
              }
              const sendMail = await axios.post(
                `${import.meta.env.VITE_BASE_URL
                }/api/busBooking/sendBookingConfirmationEmail`,
                mailBody
              );

              //send sms
              const messageBody = {
                fullName: updatePaymentDetails?.data.customerName,
                sourceCity: updatePaymentDetails?.data.sourceCity,
                destinationCity: updatePaymentDetails?.data.destinationCity,
                seats: updatePaymentDetails?.data.selectedSeats,
                amount: updatePaymentDetails?.data.totalAmount,
                pickUpLocation: updatePaymentDetails?.data.boardingPoint.location,
                opPNR: updatePaymentDetails?.data.opPNR.split("/")[0],
                doj: formatDate(updatePaymentDetails?.data.doj),
                to: updatePaymentDetails?.data.customerPhone,
              }
              const sendMessage = await axios.post(
                `${import.meta.env.VITE_BASE_URL
                }/api/busBooking/sendBookingConfirmationMessage`,
                messageBody,
              );
            }
            // navigate to payment successfull page
            setLoading(false);
            navigate(`/busbooking/payment/success?bookingId=${bookingId}`);
          } else {
            setLoading(false);
            navigate("/busbooking/payment/failure");
          }
        } else {
          setLoading(false);
          alert("Payment Failed");
        }
      }
    };
    if (paymentVerify) {
      paymentVerification();
    }
  }, [paymentVerify]);

  const date = new Date();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  //handle payment
  const handlePayment = async () => {
    
    //validate input
    const errors = validateUserData();
    if (Object.keys(errors).length > 0) {
      alert("Please fill in all the traveler details.");
      return;
    }
    setLoading(true);
    //seats data
    const seatObjects = bookingDetails?.selectedSeats?.map((seatId, index) => {
      return {
        seatNbr: seatId,
        ladiesSeat: bookingDetails?.ladiesSeat[index],
        ac: bookingDetails?.ac[index],
        sleeper: bookingDetails?.sleeper[index],
        fare: bookingDetails?.seatFares[index],
        totalFareWithTaxes: bookingDetails?.seatTotalFares[index],
        name: userData[`firstName_${index}`],
        age: userData[`age_${index}`],
        sex: userData[`gender_${index}`],
        lastName: userData[`lastName_${index}`],
        mobile: userData.mobile,
        title: " ",
        email: userData.email,
        idType: userData.idType,
        idNumber: userData.idNumber,
        nameOnId: userData[`firstName_${index}`],
        primary: true,
      };
    });

    try {
      // block seat request body
      const blockSeatRequestBody = {
        sourceCity: sourceCity,
        destinationCity: destinationCity,
        doj: doj,
        routeScheduleId: routeScheduleId,
        boardingPoint: bookingDetails?.boardingPoint,
        customerName: firstName,
        customerLastName: lastName,
        customerEmail: userData.email,
        customerPhone: userData.mobile,
        emergencyPhNumber: userData.alternativeNumber,
        customerAddress: userData.address,
        blockSeatPaxDetails: seatObjects,
        inventoryType: inventoryType,
      };
      console.log(blockSeatRequestBody);
      // block seat
      const blockSeat = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/blockSeat`,
        blockSeatRequestBody
      );
      console.log(blockSeat?.data?.apiStatus?.success);
      if (blockSeat?.data?.apiStatus?.success === true) {
        const { data: bookResponse } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/bookBus`,
          {
            ...blockSeatRequestBody,
            userId: loggedInUser._id,
            totalAmount: bookingDetails?.totalFare,
            busOperator: busName,
            busType: busType,
            selectedSeats: bookingDetails.selectedSeats?.join(", "),
            pickUpTime: pickUpTime,
            reachTime: reachTime,
            droppingPoint: bookingDetails.droppingPoint,
            cancellationPolicy: cancellationPolicy,
          }
        );

        //initiate payment
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
          {
            amount: bookingDetails?.totalFare,
            redirectUrl: `https://yesgobus.com/busbooking/payment?blockTicketId=${blockSeat.data.blockTicketKey}&bookingId=${bookResponse.data._id}&paymentVerify=1`,
          }
        );

        if (response.status === 200) {
          // update merchantTransactionId
          const updatePaymentDetails = await axios.patch(
            `${import.meta.env.VITE_BASE_URL
            }/api/busBooking/updateBooking/${bookResponse.data._id}`,
            {
              merchantTransactionId: response.data.data.merchantTransactionId,
            }
          );
          if (updatePaymentDetails.status === 200) {
            setLoading(false);
            window.open(
              response.data.data.instrumentResponse.redirectInfo.url,
              "_blank",
              "noopener noreferrer"
            );
          }
        } else {
          setLoading(false);
          alert("Please try with other seat or bus.");
        }
      } else {
        setLoading(false);
        alert("Seat is already blocked, Please try with other seat or bus.");
      }
    } catch (error) {
      console.log(error);
      console.error("Something went wrong:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //validation
  const validateUserData = () => {
    const numberOfTravelers = bookingDetails.selectedSeats.length;
    const errors = {};
    for (let index = 0; index < numberOfTravelers; index++) {
      const firstNameKey = `firstName_${index}`;
      const lastNameKey = `lastName_${index}`;
      const ageKey = `age_${index}`;
      const genderKey = `gender_${index}`;

      if (!userData[firstNameKey]?.trim()) {
        errors[firstNameKey] = `First name for Traveler ${index + 1} is required`;
      }
      if (!userData[lastNameKey]?.trim()) {
        errors[lastNameKey] = `Last name for Traveler ${index + 1} is required`;
      }
      if (!userData[ageKey]?.trim()) {
        errors[ageKey] = `Age for Traveler ${index + 1} is required`;
      }
      if (!userData[genderKey]?.trim()) {
        errors[genderKey] = `Gender for Traveler ${index + 1} is required`;
      }
    }

    if (!userData.email?.trim()) {
      errors.email = "Email is required";
    }

    if (!userData.mobile?.trim()) {
      errors.mobile = "Mobile is required";
    }
    if (!userData.address?.trim()) {
      errors.address = "Address is required";
    }
    return errors;
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
                <BusBookingCardInfo
                  title={destinationCity}
                  subtitle={reachTime}
                />
              </div>
              {/* <div className="liveLocation">
                <img src={livelocation} alt="" />
                <span>Live tracking</span>
              </div> */}
            </div>
            <div className="reviewright">
              <span>{bookingDetails?.selectedSeats?.length} Seat Selected</span>
              <span>{bookingDetails?.selectedSeats?.join(", ")}</span>
              <a href="">View Policies</a>
            </div>
          </div>

          <div className="destinations">
            <SimpleCard
              text={"Boarding Pass Details"}
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

            {bookingDetails.selectedSeats.map((seat, index) => (
              <div key={index} className="travelerDetails">
                <h3>Traveler {index + 1}:</h3>
                <div className="detailsContainer">

                  <Input
                    title={"First Name"}
                    type={"text"}
                    placeholder={"First name"}
                    onChanged={(e) => handleInputChange(e, `firstName_${index}`)}
                    givenName={`firstName_${index}`}
                    value={userData[`firstName_${index}`] || ''}
                  />
                  <Input
                    title={"Last Name"}
                    type={"text"}
                    placeholder={"Last name"}
                    onChanged={(e) => handleInputChange(e, `lastName_${index}`)}
                    givenName={`lastName_${index}`}
                    value={userData[`lastName_${index}`] || ''}
                  />
                  <Input
                    title={"Age"}
                    type={"number"}
                    placeholder={"Enter Age"}
                    onChanged={(e) => handleInputChange(e, `age_${index}`)}
                    givenName={`age_${index}`}
                    value={userData[`age_${index}`] || ''}
                  />
                  <div className="genderContainer">
                    <label htmlFor={`gender_${index}`}>Gender</label>
                    <select
                      name={`gender_${index}`}
                      id={`gender_${index}`}
                      value={userData[`gender_${index}`] || ''}
                      onChange={(e) => handleInputChange(e, `gender_${index}`)}
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

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
                value={userData.email}
              />
              <Input
                title={"Mobile Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"mobile"}
                value={userData.mobile}
              />
              {/* <Input
                title={"Altername Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"alternativeNumber"}
              /> */}
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
            <div class="label-container">
              <span>Enter ID Proof</span>
              <label className="optional">*optional</label>
            </div>
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
          <Button
            text={`Pay Amount ₹${bookingDetails?.totalFare}`}
            onClicked={handlePayment}
          />
        </div>
      </div>
      {/* <div className="popularBusRoutes">
        <Title title={"Popular Bus Routes"} subtitle={"View More"} />

        <div className="popularBusRoutesContainer">
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes
            busname={"Hyderabad Bus"}
            to={"Ananthapur, Kurnool, Shadnagar"}
          />
          <PopularRoutes
            busname={"Chennai Bus"}
            to={"Bangarapet, Jolarpettai, Katpadi"}
          />
          <PopularRoutes
            busname={"Trivandrum Bus"}
            to={"Salem, Coimbatore, Kochi"}
          />
          <PopularRoutes
            busname={"Mangalore Bus"}
            to={"Kunigal, Hassan, Sakaleshpura"}
          />
        </div>
      </div> */}
      <Footer />
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
