import "./PaymentFailure.scss";
import { failed } from "../../assets/payment";
import { Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(`/busbooking`);
  }
  return (
    <div>
      <div className="PaymentFailure">
        <div className="container">
          <img src={failed} alt="" />
          <h1>Payment Failure</h1>
          <hr />
          <div className="buttons">
            {/* <Button text={"Try Again"} /> */}
            <Button text={"Go Home"} onClicked={handleGoHome} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
