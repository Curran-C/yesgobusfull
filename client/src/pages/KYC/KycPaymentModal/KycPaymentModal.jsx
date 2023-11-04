import Button from "../../../components/Button/Button";
import CardWithText from "../CardWithText/CardWithText";
import "./KycPaymentModal.scss";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/service";

const KycPaymentModal = ({ onCancel, driverId }) => {
  const [driver, setDriver] = useState("");
  useEffect(() => {
    const getDriverById = async () => {
      const getDriverDetails = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/driver/getDriverById/${driverId}`,
      );
      if (getDriverDetails.status === 200) {
        setDriver(getDriverDetails.data.data);
      }
    };

    getDriverById();
  }, [driverId]);
  let user = {
    name: driver.firstName + " " + driver.lastName,
    email: driver.email,
    pan: driver.pancard || driver.drivinglicense || driver.aadhar
  };

  let idType;

  if (driver.pancard) {
    idType = "PAN";
  } else if (driver.aadhar) {
    idType = "Aadhaar";
  } else if (driver.drivinglicense) {
    idType = "Driving License";
  } else {
    idType = "Unknown";
  }

  let address = {
    line1: "yesgobus",
    line2: "No. 17074",
    line3: "Basavan Bagewadi, Nidagundi,",
    line4: "Vijayapura, Bijapur-586213",
  };
  return (
    <div className="PaymentModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="modalcontainer">
        <div className="modalwrapper">
          <h1>Thank You</h1>
          <h2>You're now one of our Drivers!</h2>
          <div className="cardsWithText">
            <CardWithText
              billing={true}
              title={"Driver Details"}
              user={user}
              idType={idType}
            />
            <CardWithText
              billing={false}
              title={"Billing Detials"}
              address={address}
            />
          </div>
          {/* <div className="buttons">
            <Button text={"View Invoice"} />
            <Button text={"Download Invoice"} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default KycPaymentModal;
