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
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const { data: getBookingDetails } = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/busBooking/getBookingById/${bookingId}`
        );
        setBookingDetails(getBookingDetails.data);
        // const {data: sendMessageResponse} = await axios.post(
        //   `${
        //     import.meta.env.VITE_BASE_URL
        //   }/api/busBooking/sendBookingConfirmationMessage`, {
        //     tid: getBookingDetails.data.tid,
        //     opPNR: getBookingDetails.data.opPNR,
        //     doj: getBookingDetails.data.doj,
        //     toNumber: getBookingDetails.data.customerPhone,
        //   }
        // );
      } catch (error) {
        console.log(error);
      }
    };
    getBookingDetails();
  }, []);

  const handleDownloadPDF = () => {
    navigate(`/busbooking/ticket?bookingId=${bookingId}`);
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
