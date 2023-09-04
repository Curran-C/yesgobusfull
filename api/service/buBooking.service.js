import axios from "axios";
import BusBooking from "../modals/busBooking.modal.js";

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

export const getBusFilters = async (args) => {
  try {
    const searchResponse = await searchBus(args);
    const filters = {
      boardingPoints: [],
      droppingPoints: [],
      busPartners: [],
    };

    if (searchResponse.apiAvailableBuses && searchResponse.apiAvailableBuses.length > 0) {
      searchResponse.apiAvailableBuses.forEach((bus) => {
        if (bus.boardingPoints && bus.boardingPoints.length > 0) {
          bus.boardingPoints.forEach((point) => {
            filters.boardingPoints.push(point.location);
          });
        }
        if (bus.droppingPoints && bus.droppingPoints.length > 0) {
          bus.droppingPoints.forEach((point) => {
            filters.droppingPoints.push(point.location);
          });
        }
        filters.busPartners.push(bus.operatorName);
      });
    }
    filters.boardingPoints = [...new Set(filters.boardingPoints)];
    filters.droppingPoints = [...new Set(filters.droppingPoints)];
    filters.busPartners = [...new Set(filters.busPartners)];
    return {
      status: 200,
      data: filters
    };
  } catch (error) {
    throw error.message;
  }
};

export const getBusDetails = async (searchArgs, filters) => {
  try {
    const searchResponse = await searchBus(searchArgs);
    if (!filters.boardingPoint && !filters.droppingPoint && !filters.busPartner) {
      return {
        status: 200,
        data: searchResponse.apiAvailableBuses,
      };
    }
    const filteredBuses = searchResponse.apiAvailableBuses.filter((bus) => {
      if (
        filters.boardingPoint &&
        bus.boardingPoints.some(
          (point) => point.location === filters.boardingPoint
        )
      ) {
        return true;
      }
      if (
        filters.droppingPoint &&
        bus.droppingPoints.some(
          (point) => point.location === filters.droppingPoint
        )
      ) {
        return true;
      }
      if (
        filters.busPartner &&
        bus.operatorName === filters.busPartner
      ) {
        return true;
      }
      return false;
    });
    return {
      status: 200,
      data: filteredBuses,
    };
  } catch (error) {
    throw error.message;
  }
};

export const bookBus = async (bookingDetails) => {
  try {
    const booking = new BusBooking ({
      ...bookingDetails
    });
    await booking.save();
    return {
      status:200,
      message:"Booked",
      data: booking
    }
  } catch (error) {
    throw error.message;
  }
}