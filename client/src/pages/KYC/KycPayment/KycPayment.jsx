import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { netbanking, paytm, phonepe, upi } from "../../../assets/kycpayment";
import { Button } from "../../../components";
import "./KycPayment.scss";
import axiosInstance from "../../../utils/service";
import { KycNavbar } from "../../../components";
import KycPaymentModal from "../KycPaymentModal/KycPaymentModal";
import KycAmount from "../KycAmount/KycAmount";
import KycPaymentCard from "../KycPaymentCard/KycPaymentCard";

const KycPayments = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { driverId } = location.state || {
    driverId: searchParams.get("driverId"),
  };
  const paymentVerify = new URLSearchParams(location.search).has(
    "paymentVerify"
  );
  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
        {
          amount: 2000,
          redirectUrl: `https://yesgobus.com/cabs/kyc/payment?driverId=${driverId}&paymentVerify=1`,
        }
      );
      if (response.status === 200) {
        const updatePaymentDetails = await axiosInstance.patch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/driver/updateDriver/${driverId}`,
          {
            merchantTransactionId: response.data.data.merchantTransactionId,
            paymentAmount: 2000,
          }
        );
        if (updatePaymentDetails.status === 200) {
          window.open(
            response.data.data.instrumentResponse.redirectInfo.url,
            "_blank",
            "noopener noreferrer"
          );
        } else {
          alert("Something went wrong");
        }
      }
    } catch (error) {
      alert("Something went wrong");
      console.error("Something went wrong:", error);
    }
  };
  useEffect(() => {
    const paymentVerification = async () => {
      const getDriverDetails = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/driver/getDriverById/${driverId}`
      );
      if (getDriverDetails.status === 200) {
        const merchantTransactionId =
          getDriverDetails?.data?.data.merchantTransactionId;
        const checkPaymentStatus = await axiosInstance.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/payment/checkPaymentStatus/${merchantTransactionId}`
        );
        if (checkPaymentStatus.data.code === "PAYMENT_SUCCESS") {
          const updatePaymentDetails = await axiosInstance.patch(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/driver/updateDriver/${driverId}`,
            {
              paymentStatus: "paid",
            }
          );
          if (updatePaymentDetails.status === 200) {
            setShowPaymentModal(true);
          }
        } else {
          alert("Payment Failed");
        }
      }
    };
    if (paymentVerify) {
      paymentVerification();
    }
  }, [paymentVerify, driverId]);
  return (
    <div className="Payments">
      <KycNavbar />
      {showPaymentModal && (
        <KycPaymentModal onCancel={setShowPaymentModal} driverId={driverId} />
      )}
      <div className="container">
        <h1>Your KYC is completed</h1>
        <h4>Total Amount For Registeration</h4>
        <div className="wrapper">
          <div className="left">
            <div className="amounts">
              <KycAmount text={"Total Amount"} amt={"₹3000.00"} />
              <KycAmount text={"Discount"} amt={"-₹1000.00"} />
              <KycAmount text={"Tax"} amt={"Included"} />
              <KycAmount text={"Amount Payable"} amt={"₹2000.00"} />
            </div>
            <Button onClicked={() => handlePayment()} text={"Pay Now"} />
          </div>
          <div className="right">
            <div className="title">
              <p>All Payment Options</p>
              <hr />
            </div>
            <div className="payments">
              <KycPaymentCard
                image={paytm}
                title={"Paytm QR"}
                subtitle={"To use paytm qr for payment"}
              />
              <KycPaymentCard
                image={phonepe}
                title={"Phonepe QR"}
                subtitle={"To use phonepe qr for payment"}
              />
              <KycPaymentCard
                image={upi}
                title={"UPI"}
                subtitle={"To use phonepe qr for payment"}
              />
              <KycPaymentCard
                image={netbanking}
                title={"Net Banking"}
                subtitle={"To use phonepe qr for payment"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycPayments;
