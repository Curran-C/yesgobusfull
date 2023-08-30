import axios from "axios";

const sendRequest = async (url, method, data) => {
  try {
    const headers = {
      'Token': process.env.ZUELPAY_TOKEN,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
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

export const getCityList = async () => {
  const requestData = {};
  const url = "https://zuelpay.com/api/travel/bus/cityList";
  return sendRequest(url, "GET", requestData);
};

export const searchBus = async (args) => {
  const url = "https://zuelpay.com/api/travel/bus/searchBus";
  return sendRequest(url, "POST", args);
};

export const getSeatLayout = async (args) => {
  const url = "https://zuelpay.com/api/travel/bus/seatLayout";
  return sendRequest(url, "POST", args);
};

export const blockSeat = async (args) => {
  const url = "https://zuelpay.com/api/travel/bus/blockSeat";
  return sendRequest(url, "POST", args);
};

export const bookSeat = async (ticketKey) => {
  const requestData = {};
  const url = `https://zuelpay.com/api/travel/bus/bookSeat?blockTicketKey=${ticketKey}`;
  return sendRequest(url, "GET", requestData);
};

export const cancelTicket = async (args) => {
  const url = `https://zuelpay.com/api/travel/bus/cancelTicket`;
  return sendRequest(url, "POST", args);
};