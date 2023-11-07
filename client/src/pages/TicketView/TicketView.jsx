import { Navbar } from "../../components";
import { timeline } from "../../assets/contact";
import "./TicketView.scss";
import { Link } from "react-router-dom";
import Terms from "../../components/TicketView/Terms";
import CustomerSupport from "../../components/TicketView/CustomerSupport";
import TicketHead from "../../components/TicketView/TicketHead";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/service";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";
const contactNumber = "+919964376733";

export default function TicketView() {
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const bookingId = urlSearchParams.get("bookingId");
  const [bookingDetails, setBookingDetails] = useState(null);
  const downloadParam = urlSearchParams.get("download");
  const [travellers, setTravellers] = useState("");
  const [travellersAge, setTravellersAge] = useState("");

  const handleDownloadPDF = () => {
    if (bookingDetails) {
      const element = document.querySelector(".ticket");
      const buttons = document.querySelectorAll(".action__buttons button");
      buttons.forEach((button) => {
        button.style.display = "none";
      });
      html2canvas(element, {
        allowTaint: false,
        removeContainer: true,
        backgroundColor: "#ffffff",
        scale: window.devicePixelRatio,
        useCORS: false,
        windowWidth: '1400px',
      }).then((canvas) => {
        const contentDataURL = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let pdf = new jsPDF("p", "mm", "a4");
        let position = 5;

        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save(`${bookingId}.pdf`);
        buttons.forEach((button) => {
          button.style.display = "block";
        });
      });
      setDownloaded(true);
    }
  };

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const { data: getBookingDetails } = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL
          }/api/busBooking/getBookingById/${bookingId}`
        );
        setBookingDetails(getBookingDetails.data);
        const joinedNames = getBookingDetails.data.blockSeatPaxDetails?.map(seat => seat.name).join(", ");
        const joinedAges = getBookingDetails.data.blockSeatPaxDetails?.map(seat => seat.age).join(", ");
        setTravellers(joinedNames);
        setTravellersAge(joinedAges);
        if (downloadParam === "1" && downloaded === false) {
          handleDownloadPDF();
          setTimeout(() => {
            navigate("/profile");
          }, 100);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBookingDetails();
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="ticketview__wrapper">
      <Navbar />
      <section className="ticket">
        <TicketHead contactNumber={contactNumber} />

        {/* Journey from and to */}
        <div className="journey__details">
          <h1>
            {bookingDetails?.sourceCity} to {bookingDetails?.destinationCity}
          </h1>
          <p>{formatDate(bookingDetails?.doj)}</p>
        </div>

        {/* Bus class */}
        <div className="bus__details">
          <h3>{bookingDetails?.busOperator}</h3>
          <p>{bookingDetails?.busType}</p>
        </div>

        {/* Pickup and Drop details */}
        <div className="pick__drop">
          <div className="boarding__details">
            <p>Boarding Points Details</p>
            <p className="orange-btn">
              {bookingDetails?.pickUpTime}
            </p>
            <div>
              {/* <p className="location">{bookingDetails?.boardingPoint.location}</p> */}
              <p className="sub-location">{bookingDetails?.boardingPoint?.location}</p>
            </div>
          </div>

          <div className="dropping__details">
            <p>Dropping Points Details</p>
            <p className="orange-btn">
              {bookingDetails?.reachTime}
            </p>
            <div>
              {/* <p className="location">{bookingData.dropping.location}</p> */}
              <p className="sub-location">{bookingDetails?.droppingPoint?.location}</p>
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
              <p>{bookingDetails?.pickUpTime}</p>
            </div>
            <div className="arriving">
              <p>Arriving Time</p>
              <p>{bookingDetails?.reachTime}</p>
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
                  {/* {bookingDetails?.customerName} {bookingDetails?.customerLastName} */}
                  {travellers}
                </td>
                <td
                  className="font-24"
                  style={{ width: "7.5%", minWidth: "5ch" }}
                >
                  {travellersAge}
                </td>
                <td
                  className="font-24"
                  style={{ width: "7.5%", minWidth: "8ch" }}
                >
                  {bookingDetails?.selectedSeats}
                </td>
                <td
                  className="font-24"
                  style={{ width: "50%", minWidth: "40ch" }}
                >
                  <p>Yesgobus Booking ID {bookingDetails?.tid}</p>
                  <p>Operator PNR :{bookingDetails?.opPNR}</p>
                  <div className="price">
                    <p>₹ {bookingDetails?.totalAmount}</p>
                  </div>
                  {/* <p>
                    You have saved ₹ {"30.00"}
                    <span style={{ fontSize: "20px" }}> Via yesgobus</span>
                  </p> */}
                  <p className="font-400">
                    Booked on {formatDate(bookingDetails?.createdAt)}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CustomerSupport contactNumber={contactNumber} />

        <Terms cancellationPolicy={bookingDetails?.cancellationPolicy} />
      </section>

      <div className="action__buttons">
        <Link to={`/`} className="home">
          Home
        </Link>

        <button className="download" onClick={() => handleDownloadPDF()}>Download Ticket</button>
      </div>
    </div>
  );
}
