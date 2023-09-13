import { useNavigate } from "react-router-dom";
import { sign } from "../../assets/KYC";
import Button from "../Button/Button";
import "./SignModal.scss";

const SignModal = ({ onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="SignModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="modalcontainer">
        <div className="modalwrapper">
          <img src={sign} alt="" />
          <h4>Please kept a white paper and pen for signature</h4>
          <p>It’s only take 2 min time for KYC verification</p>
          <div className="buttons">
            <Button onClicked={() => onCancel(false)} text={"Cancel"} />
            <Button
              onClicked={() => navigate("/kyc/payment")}
              text={"Proceed"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignModal;
