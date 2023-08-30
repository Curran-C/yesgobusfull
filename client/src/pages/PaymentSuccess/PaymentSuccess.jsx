import "./PaymentSuccess.scss";
import { successful } from "../../assets/payment";
import { Button, Navbar } from "../../components";

const PaymentSuccess = () => {
  return (
    <div className="PaymentSuccess">
      <div className="container">
        <img src={successful} alt="" />
        <h1>Payment Successful</h1>
        <p>Transaction ID: 123456789</p>
        <hr />

        <div className="amount">
          <div className="paid">
            <p>Amount Paid</p>
            <p>₹300</p>
          </div>
          <div className="paid">
            <p>Bank</p>
            <p>Fedral</p>
          </div>
        </div>

        <div className="buttons">
          <Button text={"Download Ticket"} />
          <Button text={"View Ticket"} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
