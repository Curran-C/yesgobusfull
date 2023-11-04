import Button from "../Button/Button";
import Input from "../Input/Input";
import "./AadharModal.scss";
import axiosInstance from "../../utils/service";
import { useState, useEffect } from "react";

const AadharModal = ({ onCancel, typeOfDocument, user, setUser }) => {
  const [clientId, setClientId] = useState("");

  // useEffect(() => {
  //   const authenticateAndGetToken = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `${import.meta.env.VITE_BASE_URL}/api/kyc/authenticate`
  //       );
  //       setAccessToken(response.data.access_token);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   authenticateAndGetToken();
  // }, []);

  //send aadhaar otp
  const sendOtp = async () => {
    try {
      // const requestData = {
      //   aadhaar_number: user.aadhar,
      //   access_token: accessToken,
      // };
      const requestData = {
        aadhaar_number: user?.aadhar,
      };
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/kyc/aadhaar/generateOtp`,
        requestData
      );
      if (response.data?.status === "success") {
        setClientId(response.data.data.client_id);
        alert("OTP Sent Successfully");
      } else {
        alert("Invalid");
      }
    } catch (error) {
      console.error("Error while Generating aadhaar otp:", error);
    }
  };

  //verify aadhar otp
  const verifyOtp = async () => {
    try {
      // const requestData = {
      //   otp: user?.otp,
      //   ref_id: refId,
      //   access_token: accessToken,
      // };
      const requestData = {
        otp: user?.otp,
        client_id: clientId,
      };
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/kyc/aadhaar/verifyOtp`,
        requestData
      );
      if (response.data?.status === "success") {
        alert("Verified Successfully");
        onCancel(false);
      } else {
        alert("Invalid");
      }
    } catch (err) {
      alert("Invalid");
      console.error("Error while verifying adaar otp:", err);
    }
  };

  //verify pan
  const verifyPan = async () => {
    try {
      // const requestData = {
      //   pan: user?.pancard,
      //   access_token: accessToken,
      // };
      const requestData = {
        panNumber: user?.pancard,
        dob: user?.dob,
        fullName: user.fullName,
      };
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/kyc/pan/verify`,
        requestData
      );
      if (
        response.data?.status === "success"
      ) {
        alert("Verified Successfully");
        onCancel(false);
      } else {
        alert("Invalid");
      }
    } catch (err) {
      console.error("Error while verifying pan:", err);
    }
  };

  //verify driving licence
  const verifyDrivingLicense = async () => {
    try {
      const requestData = {
        id_number: user?.drivinglicense,
        dob: user?.dob,
      };
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/kyc/drivingLicense/verify`,
        requestData
      );
      if (
        response.data?.status === "success" &&
        response.data?.data?.name
          .toLowerCase()
          .includes(user?.firstName?.toLowerCase())
      ) {
        alert("Verified Successfully");
        onCancel(false);
      } else {
        alert("Invalid");
      }
    } catch (err) {
      console.error("Error while verifying driving license:", err);
    }
  };

  return (
    <div className="SignModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="modalcontainer">
        <div className="modalwrapper">
          <div className="inputs">
            <Input
              type={"text"}
              placeholder={`Enter ${typeOfDocument} number`}
              onChanged={setUser}
              givenName={`${typeOfDocument?.toLowerCase().split(" ").join("")}`}
              isKyc={true}
            />
            {typeOfDocument === "Aadhar" && (
            <Button
              onClicked={typeOfDocument === "Aadhar" ? sendOtp : verifyPan}
              text={typeOfDocument !== "Pancard" ? "Send OTP" : "Verify"}
            />
            )}
          </div>
          {(typeOfDocument === "Pancard") && (
            <div className="inputs">
              <Input
                type={"text"}
                placeholder={"Full Name"}
                onChanged={setUser}
                givenName={"fullName"}
                isKyc={true}
              />
            </div>
          )}
          {(typeOfDocument === "Pancard" || typeOfDocument === "Driving License") && (
            <div className="inputs">
              <Input
                type={"date"}
                placeholder={"DOB"}
                onChanged={setUser}
                givenName={"dob"}
                isKyc={true}
              />
              <Button 
              onClicked={typeOfDocument === "Pancard" ? verifyPan : verifyDrivingLicense} 
              text={"Verify"} 
              />
            </div>
          )}
          {typeOfDocument === "Aadhar" && (
            <div className="inputs">
              <Input
                type={"number"}
                placeholder={"OTP"}
                onChanged={setUser}
                givenName={"otp"}
                isKyc={true}
              />
              <Button onClicked={verifyOtp} text={"Verify"} />
            </div>
          )}
          <div className="buttons">
            <Button text={"Cancel"} onClicked={() => onCancel(false)} />
            {/* <Button
              text={"Submit"}
              onClicked={() => {
                alert("Details Submited successfully");
                onCancel(false);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadharModal;
