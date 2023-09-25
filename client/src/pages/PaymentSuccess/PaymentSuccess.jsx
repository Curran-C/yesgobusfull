import "./PaymentSuccess.scss";
import { successful } from "../../assets/payment";
import { Button, Navbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PaymentSuccess = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const bookingId = urlSearchParams.get("bookingId");
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState(null);
  console.log(bookingId);
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const { data: getBookingDetails } = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/busBooking/getBookingById/${bookingId}`
        );
        setBookingDetails(getBookingDetails.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookingDetails();
  }, []);

  const handleDownloadPDF = () => {
    // const element = document.querySelector(".container");
    // const buttons = document.querySelectorAll(".buttons button");
    // buttons.forEach((button) => {
    //   button.style.display = "none";
    // });
    // html2canvas(element, {
    //   allowTaint: false,
    //   removeContainer: true,
    //   backgroundColor: "#ffffff",
    //   scale: window.devicePixelRatio,
    //   useCORS: false,
    // }).then((canvas) => {
    //   const contentDataURL = canvas.toDataURL("image/png");
    //   const imgWidth = 210;
    //   const pageHeight = 295;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   let heightLeft = imgHeight;
    //   let pdf = new jsPDF("p", "mm", "a4");
    //   let position = 5;

    //   pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    //   heightLeft -= pageHeight;

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     pdf.addPage();
    //     pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;
    //   }
    //   pdf.save(`${bookingId}.pdf`);
    //   buttons.forEach((button) => {
    //     button.style.display = "block";
    //   });
    // });
    navigate(`/busbooking/ticket?bookingId=${bookingId}&download=1`);
  };

  // Navigate to ticket view. Add query params here.
  const handleTicketView = () => {
    navigate(`/busbooking/ticket?bookingId=${bookingId}`);
  };

  return (
    <div className="PaymentSuccess">
      <div className="container">
        <img src={successful} alt="" />
        <h1>Payment Successful</h1>
        <p>Ticket Number: {bookingDetails?.tid}</p>
        <p>PNR No: {bookingDetails?.opPNR}</p>
        <hr />

        <div className="amount">
          <div className="paid">
            <p>Amount Paid: </p>
            <p>₹{bookingDetails?.totalAmount}</p>
          </div>
          {/* <div className="paid">
            <p>Bank</p>
            <p>Fedral</p>
          </div> */}
        </div>

        <div className="buttons">
          <Button text={"Download Ticket"} onClicked={handleDownloadPDF} />
          <Button text={"View Ticket"} onClicked={handleTicketView} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
