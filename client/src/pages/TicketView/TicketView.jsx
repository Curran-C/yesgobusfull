import { Navbar } from "../../components";
import { blacklogo } from "../../assets/homepage";
import {
  telephoneIcon,
  timeline,
  telephoneIconFill,
} from "../../assets/contact";
import "./TicketView.scss";
import { Link } from "react-router-dom";

export default function TicketView() {
  // Mock data for ticket
  const bookingData = {
    from: "Mysore",
    to: "Bangalore",
    date: "Tuesday, 04 July, 2023",
    class: "TATA A/C Sleeper (2+1) 44 Seats",
    boarding: {
      time: "19:00",
      date: "4th July 2023",
      location: "Infosys Gate",
      subLocation: "INFOSYS GATE NO 2,134,33",
    },
    dropping: {
      time: "21:00",
      date: "4th July 2023",
      location: "Hcross",
      subLocation: "Hcross high way , bng",
    },
  };

  return (
    <div className="ticketview__wrapper">
      <Navbar />
      <section className="ticket">
        <header className="ticket__header">
          <div className="helpline">
            <img
              src={blacklogo}
              alt="yesgobus logo"
              style={{ width: "100px" }}
            />
            <div className="helpline__details">
              <img
                src={telephoneIcon}
                alt="telephone"
                style={{ width: "40px", height: "40px" }}
              />
              <div className="helpline__number">
                <p>Yesgobus Helpline</p>
                <p>040-22233311</p>
              </div>
            </div>
          </div>
        </header>

        <div className="journey__details">
          <h1>
            {bookingData.from} to {bookingData.to}
          </h1>
          <p>{bookingData.date}</p>
        </div>

        <div className="bus__details">
          <h3>Yesgobus</h3>
          <p>{bookingData.class}</p>
        </div>

        <div className="pick__drop">
          <div className="boarding__details">
            <p>Boarding Points Details</p>
            <p className="orange-btn">
              {bookingData.boarding.time}, {bookingData.boarding.date}
            </p>
            <div>
              <p className="location">{bookingData.boarding.location}</p>
              <p className="sub-location">{bookingData.boarding.subLocation}</p>
            </div>
          </div>

          <div className="dropping__details">
            <p>Dropping Points Details</p>
            <p className="orange-btn">
              {bookingData.dropping.time}, {bookingData.dropping.date}
            </p>
            <div>
              <p className="location">{bookingData.dropping.location}</p>
              <p className="sub-location">{bookingData.dropping.subLocation}</p>
            </div>
          </div>
        </div>

        <div className="time__line">
          <div className="time__line__image">
            <img src={timeline} alt="" />
            <div className="line"></div>
          </div>

          <div className="schedule">
            <div className="reporting">
              <p>Reporting Time</p>
              <p>{bookingData.boarding.time}</p>
            </div>
            <div className="arriving">
              <p>Arriving Time</p>
              <p>{bookingData.dropping.time}</p>
            </div>
          </div>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Travellers</th>
                <th>Age</th>
                <th>Seat #</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "5%" }}>01</td>
                <td
                  className="font-24"
                  style={{ textAlign: "left", width: "30%" }}
                >
                  Pramod
                </td>
                <td className="font-24" style={{ width: "7.5%" }}>
                  28
                </td>
                <td className="font-24" style={{ width: "7.5%" }}>
                  E 05
                </td>
                <td className="font-24" style={{ width: "50%" }}>
                  <p>Yesgobus Booking ID {"KA-10987645823CGX"}</p>
                  <p>Operator PNR #{"523565"}</p>
                  <div className="price">
                    <p>₹ {"830.00"}</p>
                  </div>
                  <p>
                    You have saved ₹ {"30.00"}
                    <span style={{ fontSize: "20px" }}> Via yesgobus</span>
                  </p>
                  <p className="font-400">
                    Booked on {"03-07-2023"} at : {"08:19:00 Pm"}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="customer__support">
          <h2>Customer Support and Enquiries</h2>
          <div className="support__contact">
            <img src={telephoneIconFill} alt="" />
            <div className="support__number">
              <h3 className="">Yesgobus</h3>
              <p>040-22233311</p>
            </div>
          </div>
        </div>

        <div className="terms">
          <h2>Terms and Conditions</h2>
          <ul>
            <li>
              <p>
                Yesgobus Travellers can book bus tickets online at the lowest
                ticket fares. Travellers prefer to choose their favorite bus to
                reserve online bus booking. You’re at the right place to find a
                wide range of Private buses and SRTC (State Road Transport
                Corporation) buses are available for bus booking online on bus.
              </p>
            </li>
            <li>
              <p>
                Passengers should arrive at the 15 min before the scheduled time
                of departure.
              </p>
            </li>
            <li>
              <p>
                Yesgobus is not responsible for any accident or any passenger
                losses.
              </p>
            </li>
            <li>
              <p>
                Cancellation charges are applicable on original fare but on the
                discount fee.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className="action__buttons">
        <Link to={`/`} className="home">
          Home
        </Link>
        <button className="download">Download Ticket</button>
      </div>
    </div>
  );
}
