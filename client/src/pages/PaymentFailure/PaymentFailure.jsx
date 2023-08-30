import "./PaymentFailure.scss";
import { failed } from "../../assets/payment";
import { Button } from "../../components";

const PaymentFailure = () => {
  return (
    <div>
      <div className="PaymentSuccess">
        <div className="container">
          <img src={failed} alt="" />
          <h1>Payment Failure</h1>
          <hr />
          <div className="buttons">
            <Button text={"Try Again"} />
            <Button text={"Go Home"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
