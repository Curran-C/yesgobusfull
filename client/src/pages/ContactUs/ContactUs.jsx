import { call, message, locationIcon } from "../../assets/contact";
import { Card, Footer, Navbar } from "../../components";
import "./ContactUs.scss";

const ContactUs = () => {
  return (
    <div className="ContactUs">
      <Navbar />
      <div className="contactContainer">
        <div className="Title">
          <h1 className="title">How can we help you Today?</h1>
          <p className="subtitle">Our experts are happy to help you</p>
        </div>
        <div className="cards">
          <Card
            img={message}
            title={"Email Us"}
            subtitle={
              "Write to us about your query and our customer support team will revert as soon as possible."
            }
            text={"Send Mail"}
            link={"yesgobus.help@gmail.com"}
          />
          <Card
            img={call}
            title={"Call Us"}
            subtitle={
              "You may call us between Monday to Friday 9:00 am to 5:30 pm from your registered mobile number."
            }
            text={"Call Us"}
            link={"9964376733"}
          />
          <Card
            img={locationIcon}
            title={"Our address"}
            subtitle={`No. 17074, Basavan Bagewadi,
            Nidagundi, Vijayapura, Bijapur - 586213`}
            // text={"Call Us"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
