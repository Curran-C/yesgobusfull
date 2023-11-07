import axios from "axios";
import BankModal from "../modals/bankDetails.modal.js";

const sendRequest = async (url, method, headers, data) => {
  try {
    const response = await axios({
      method: method,
      url: `https://api.idcentral.io/idc${url}`,
      // url: url,
      headers: headers,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

// export const authenticate = async () => {
//   const headers = {
//     'accept': 'application/json',
//     'x-api-key': process.env.API_KEY,
//     'x-api-secret': process.env.API_SECRET,
//     'x-api-version': '1.0',
//   };
//   const requestData = {};
//   const url = "https://api.sandbox.co.in/authenticate";
//   return sendRequest(url, "POST", headers, requestData);
// };

// export const aadhaarKycGenerateOtp = async (access_token, aadhaar_number) => {
//   const headers = {
//     'Authorization': access_token,
//     'accept': 'application/json',
//     'content-type': 'application/json',
//     'x-api-key': process.env.API_KEY,
//     'x-api-version': '1.0',
//   };
//   const requestData = {
//     "aadhaar_number": aadhaar_number
//   };
//   const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp";
//   return sendRequest(url, "POST", headers, requestData);
// };

// export const aadhaarKycVerifyOtp = async (access_token, otp, ref_id) => {
//   const headers = {
//     'Authorization': access_token,
//     'accept': 'application/json',
//     'content-type': 'application/json',
//     'x-api-key': process.env.API_KEY,
//     'x-api-version': '1.0',
//   };
//   const requestData = {
//     "otp": otp,
//     "ref_id": ref_id
//   };
//   const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify";
//   return sendRequest(url, "POST", headers, requestData);
// };

// export const panVerification = async (access_token, pan) => {
//   const headers = {
//     'Accept': 'application/json',
//     'Authorization': access_token,
//     'x-api-key': process.env.API_KEY,
//     'x-api-version': '1.0',
//   };
//   const url = `https://api.sandbox.co.in/pans/${pan}/verify?consent=y&reason=For%20KYC%20of%20User`;
//   return sendRequest(url, "GET", headers, null);
// };

// export const bankAccountVerification = async (access_token, ifsc, account_number) => {
//   const headers = {
//     'Authorization': access_token,
//     'x-api-key': process.env.API_KEY,
//     'x-api-version': '1.0.0'
//   };
//   const url = `https://api.sandbox.co.in/bank/${ifsc}/accounts/${account_number}/verify`;
//   return sendRequest(url, "GET", headers, null);
// };

export const aadhaarKycGenerateOtp = async (aadhaar_number) => {
  const headers = {
    'accept': 'application/json',
    'api-key': process.env.API_KEY
  };
  const requestData = {};
  const url = `/aadhar/${aadhaar_number}`;
  return sendRequest(url, "POST", headers, requestData);
};

export const aadhaarKycVerifyOtp = async (otp, client_id) => {
  const headers = {
    'accept': 'application/json',
    'api-key': process.env.API_KEY
  };
  const requestData = {
    "otp": otp,
    "client_id": client_id
  };
  const url = "/aadhar/otp";
  return sendRequest(url, "POST", headers, requestData);
};

export const panVerification = async (panNumber, dob, fullName) => {
  const headers = {
    'accept': 'application/json',
    'api-key': process.env.API_KEY,
    'Content-Type': 'application/json'
  };
  const requestData = {
    "id_number": panNumber,
    "dob": dob,
    "full_name": fullName
  }
  const url = `/pan/verify`;
  return sendRequest(url, "POST", headers, requestData);
};

export const bankAccountVerification = async (ifsc, account_number) => {
  const headers = {
    'accept': 'application/json',
    'api-key': process.env.API_KEY,
    'Content-Type': 'application/json'
  };
  const requestData = {
    "id_number": account_number,
    "ifsc": ifsc
  }
  const bankDetails = await BankModal.findOne({
    ...requestData
  });
  if (bankDetails) {
    return {
      data: {
        full_name: bankDetails.full_name,
      },
      status: "success",
    }
  }
  const url = `/bank`;
  const response = await sendRequest(url, "POST", headers, requestData);
  const newBankDetails = new BankModal({
    ...requestData,
    full_name: response.data.full_name,
  });
  await newBankDetails.save();
  return response;
};

export const drivingLicenseVerification = async (id_number, dob) => {
  const headers = {
    'accept': 'application/json',
    'api-key': process.env.API_KEY,
  };
  const requestData = {
    "id_number": id_number,
    "dob": dob
  }
  const url = `/driving-license`;
  return sendRequest(url, "POST", headers, requestData);
};
