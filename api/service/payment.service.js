import axios from "axios";
import crypto from 'crypto';

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

function generateId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const initiatePayment = async (args) => {
  const merchantTransactionId = generateId(18);
  const merchantUserId = generateId(10);
  const { amount, redirectUrl } = args;

  const payload = {
    "merchantId": process.env.MERCHANT_ID,
    "merchantTransactionId": merchantTransactionId,
    "merchantUserId": merchantUserId,
    "amount": amount,
    "redirectUrl": redirectUrl,
    "redirectMode": "POST",
    "callbackUrl": "https://webhook.site/callback-url",
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = btoa(payloadString);
  const requestData = {
    request: base64Payload
  }

  const apiEndpoint = "/pg/v1/pay";
  const saltKey = process.env.SALT_KEY;
  const saltIndex = process.env.SALT_INDEX;

  const concatenatedData = base64Payload + apiEndpoint + saltKey;
  const sha256Hash = crypto.createHash('sha256');
  const checksum = sha256Hash.update(concatenatedData).digest('hex');
  const xVerify = checksum.toString() + "###" + saltIndex;

  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': xVerify,
  };
  const url = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";
  // const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  return sendRequest(url, "POST", headers, requestData);
};

export const checkPaymentStatus = async (args) => {
  const merchantId = process.env.MERCHANT_ID;
  const { merchantTransactionId } = args;
  const requestData = {}

  const apiEndpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const saltKey = process.env.SALT_KEY;
  const saltIndex = process.env.SALT_INDEX;

  const concatenatedData = apiEndpoint + saltKey;
  const sha256Hash = crypto.createHash('sha256');
  const checksum = sha256Hash.update(concatenatedData).digest('hex');
  const xVerify = checksum.toString() + "###" + saltIndex;
  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': xVerify,
    'X-MERCHANT-ID': process.env.MERCHANT_ID,
  };
  const url = `https://api-preprod.phonepe.com/apis/hermes${apiEndpoint}`;
  // const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  return sendRequest(url, "GET", headers, requestData);
};