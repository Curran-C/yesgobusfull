import axios from "axios";

const sendRequest = async (url, method, headers, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const authenticate = async () => {
  const headers = {
    'accept': 'application/json',
    'x-api-key': process.env.API_KEY,
    'x-api-secret': process.env.API_SECRET,
    'x-api-version': '1.0',
  };
  const requestData = {};
  const url = "https://api.sandbox.co.in/authenticate";
  return sendRequest(url, "POST", headers, requestData);
};

export const aadhaarKycGenerateOtp = async (access_token, aadhaar_number) => {
  console.log(access_token,aadhaar_number)
  const headers = {
    'Authorization': access_token,
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.API_KEY,
    'x-api-version': '1.0',
  };
  const requestData = {
    "aadhaar_number": aadhaar_number
  };
  const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp";
  return sendRequest(url, "POST", headers, requestData);
};

export const aadhaarKycVerifyOtp = async (access_token, otp, ref_id) => {
  const headers = {
    'Authorization': access_token,
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.API_KEY,
    'x-api-version': '1.0',
  };
  const requestData = {
    "otp": otp,
    "ref_id": ref_id
  };
  const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify";
  return sendRequest(url, "POST", headers, requestData);
};

export const panVerification = async (access_token, pan) => {
  const headers = {
    'Accept': 'application/json',
    'Authorization': access_token,
    'x-api-key': process.env.API_KEY,
    'x-api-version': '1.0',
  };
  const url = `https://api.sandbox.co.in/pans/${pan}/verify?consent=y&reason=For%20KYC%20of%20User`;
  return sendRequest(url, "GET", headers, null);
};

export const bankAccountVerification = async (access_token, ifsc, account_number) => {
  const headers = {
    'Authorization': access_token,
    'x-api-key': process.env.API_KEY,
    'x-api-version': '1.0.0'
  };
  const url = `https://api.sandbox.co.in/bank/${ifsc}/accounts/${account_number}/verify`;
  return sendRequest(url, "GET", headers, null);
};
