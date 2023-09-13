import { useNavigate } from "react-router-dom";
// import { logo } from "../../assets";
import {
  air,
  applestore,
  appstore,
  fb,
  gplay,
  hero,
  insta,
  linkedin,
  longdistance,
  map,
  mastercard,
  playstore,
  rupay,
  taxi,
  taxionphone,
  twitter,
  visa,
} from "../../../assets/homepage";
import {
  Button,
  Footer,
  InfoCard,
  KycNavbar,
  Navbar,
  SimpleCard,
  Title,
} from "../../../components";
import "./KycLandingPage.scss";
import Tick from "../../../components/Tick/Tick";

const KycLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="kyclandingPage">
      <KycNavbar />
      <div className="hero">
        <img className="heroimg" src={hero} alt="" />
        <div className="left">
          <h1>
            PROVIDING QUALITY SERVICES AT <span>AFFORDABLE PRICES</span>
          </h1>
          <Button onClicked={() => navigate("/kyc")} text={"Become a Driver"} />
          <p></p>
        </div>
      </div>

      <div className="whatWeOffer">
        <Title
          title={"What We Offer"}
          subtitle={"JOIN US"}
          text={
            "Embark on a journey like never before with our comprehensive services. Experience swift pickups, seamless air travel transfers, comfortable long-distance rides, and captivating taxi tours that redefine your travel experience."
          }
        />
        <div className="wrapper">
          <InfoCard
            img={map}
            title={"Address Pickup"}
            subtitle={
              "Experience lightning-fast pickups from any location, tailored to your convenience."
            }
          />
          <InfoCard
            img={air}
            title={"Airport Transfer"}
            subtitle={
              "Seamless air transfers that synchronize with your flight schedule, ensuring a stress-free travel experience."
            }
          />
          <InfoCard
            img={longdistance}
            title={"Long Distance"}
            subtitle={
              "Unwind on extended journeys with our comfortable and reliable long-distance travel services"
            }
          />
          <InfoCard
            img={taxi}
            title={"Taxi Tour"}
            subtitle={
              "Unwind on extended journeys with our comfortable and reliable long-distance travel services"
            }
          />
        </div>
      </div>

      <div className="forDrivers">
        <Title
          title={"For Drivers"}
          subtitle={"DO YOU WANT TO EARN WITH US"}
          text={
            "Join our team of esteemed cab drivers and unlock a world of earning potential. Enjoy flexible hours, competitive earnings, and a supportive community that values your contribution"
          }
        />
        <div className="wrapper">
          <div className="ticks">
            <Tick text={"Luxury Cars"} />
            <Tick text={"No Fees"} />
            <Tick text={"Weekly Payments"} />
          </div>

          <div className="ticks">
            <Tick text={"Fixed Price"} />
            <Tick text={"Good Application"} />
            <Tick text={"Stable Orders"} />
          </div>

          <Button text={"BECOME A DRIVER"} />
        </div>
      </div>

      <div className="appOnTheMarket">
        <Title title={"YesGoBus on the Market"} subtitle={"Get It Now"} />
        <div className="wrapper">
          <img src={taxionphone} alt="" />
          <div className="right">
            <span>
              Download the Taxi App on iphone & Android market places.
            </span>
            <div className="downloads">
              <img src={gplay} alt="" />
              <img src={applestore} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="carClasses">
        <Title title={"Car Classes and Rating"} subtitle={"CHOOSE YOUR CAR"} />
        <div className="cards">
          <SimpleCard
            title="Standard Class"
            text={
              "If you can select standard class car person’s can set 4 members and there have a limited features in this car"
            }
            rate={"Rs 50/Mi"}
          />
          <SimpleCard
            title="Economy Class"
            text={
              "If you can select economy class car person’s can set 5 members and there is no features in this car"
            }
            rate={"Rs 30/Mi"}
          />
          <SimpleCard
            title="Business Class"
            text={
              "If you can select standard class car person’s can set 4 members and have lots of features in this car"
            }
            rate={"Rs 90/Mi"}
          />
        </div>
      </div>

      <div>
        {/* <div className="aboveFooter">
          <img src={logo} alt="" />
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
            images={[playstore, appstore]}
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
    </div>
  );
};

export default KycLandingPage;
