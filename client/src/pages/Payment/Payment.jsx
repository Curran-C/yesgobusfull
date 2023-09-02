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

const Payment = () => {
  const date = new Date();
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
        {
          amount: 10,
          redirectUrl: `https://yesgobus.com/busbooking/payment/success`
        }
      );
      window.location.replace(response.data.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
      alert("Something went wrong");
      console.error("omething went wrong:", error);
    }
  }
  return (
    <div className="Payment">
      <Navbar />
      <BusRoute
        locationOne={"Mysore"}
        locationTwo={"Bangalore"}
        departureDate={"03 Jun"}
        returnDate={"- - -"}
      />

      <div className="container">
        <div className="containerleft">
          <h5>Review your booking</h5>
          <RoutesTitle
            locationOne={"Bangalore"}
            locationTwo={"Mangalore"}
            date={date.toDateString()}
          />

          <div className="reviewsCard">
            <div className="reviewleft">
              <BusBookingCardInfo
                title={"YesGoBus"}
                subtitle={"TATA A/C Sleeper (2+1)"}
                rating={5}
                reviews={100}
              />
              <div className="to">
                <BusBookingCardInfo title={"Bangalore"} subtitle={"19:00"} />
                <BusBookingCardInfo img={true} subtitle={"3hr 20min"} />
                <BusBookingCardInfo title={"Mangalore"} subtitle={"23:30"} />
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
              />
              <Input title={"Age"} type={"number"} placeholder={"40"} />
              <Input
                title={"Gender"}
                type={"text"}
                placeholder={"Male / Female / Other"}
              />
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
              />
              <Input
                title={"Mobile Number"}
                type={"number"}
                placeholder={"1234567890"}
              />
              <Input
                title={"Altername Number"}
                type={"number"}
                placeholder={"1234567890"}
              />
            </div>
          </div>

          {/* Picode Details */}
          <div className="details">
            <span>Enter Contact Details</span>
            <div className="detailsContainer">
              <Input title={"Pincode"} type={"number"} placeholder={"560"} />
              <Input
                title={"Mobile Number"}
                type={"number"}
                placeholder={"1234567890"}
              />
              <Input
                title={"Altername Number"}
                type={"number"}
                placeholder={"1234567890"}
              />
            </div>
          </div>

          {/* Trip Type */}
          <div className="tripType">
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
          </div>
        </div>
        <div className="containerright">
          <div className="paymentCard">
            <h2>Price</h2>
            <hr />
            <div className="prices">
              <div className="price">
                <p>Total Basefare</p>
                <p>₹800</p>
              </div>
              <hr />
              <div className="price">
                <p>Tax</p>
                <p>₹30</p>
              </div>
              <hr />
              <div className="price">
                <p>Total Basefare</p>
                <p>₹830</p>
              </div>
              <hr />
            </div>
          </div>

          <div className="paymentCard">
            <h2>OFFERS</h2>
            <div className="promo">
              <div className="heading">
                <img src={offer} alt="" />
                <p>Enter Promo Code</p>
              </div>
              <hr />
              <input type="text" name="" id="" placeholder="Enter your code" />
            </div>
          </div>
          <Button text={"Pay Amount ₹830"} onClicked={handlePayment}/>
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
