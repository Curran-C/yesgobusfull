import { Navbar } from "../../components";
import { timeline } from "../../assets/contact";
import "./TicketView.scss";
import { Link } from "react-router-dom";
import Terms from "../../components/TicketView/Terms";
import CustomerSupport from "../../components/TicketView/CustomerSupport";
import TicketHead from "../../components/TicketView/TicketHead";

const contactNumber = "040-22233311";

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
        <TicketHead contactNumber={contactNumber} />

        {/* Journey from and to */}
        <div className="journey__details">
          <h1>
            {bookingData.from} to {bookingData.to}
          </h1>
          <p>{bookingData.date}</p>
        </div>

        {/* Bus class */}
        <div className="bus__details">
          <h3>Yesgobus</h3>
          <p>{bookingData.class}</p>
        </div>

        {/* Pickup and Drop details */}
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

        {/* Reporting and Arriving Time */}
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
            {/* Table Head */}
            <thead>
              <tr>
                <th></th>
                <th>Travellers</th>
                <th>Age</th>
                <th>Seat #</th>
                <th>Details</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {/* Loop booking data for table row here */}
              <tr>
                <td style={{ width: "5%", minWidth: "5ch" }}>01</td>
                <td
                  className="font-24"
                  style={{ textAlign: "left", width: "30%", minWidth: "20ch" }}
                >
                  Pramod
                </td>
                <td
                  className="font-24"
                  style={{ width: "7.5%", minWidth: "5ch" }}
                >
                  28
                </td>
                <td
                  className="font-24"
                  style={{ width: "7.5%", minWidth: "8ch" }}
                >
                  E 05
                </td>
                <td
                  className="font-24"
                  style={{ width: "50%", minWidth: "40ch" }}
                >
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

        <CustomerSupport contactNumber={contactNumber} />

        <Terms />
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
