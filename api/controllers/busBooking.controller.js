import {
  getCityList,
  searchBus,
  getSeatLayout,
  blockSeat,
  bookSeat,
  cancelTicket,
} from "../service/buBooking.service.js";

export const getCityListController = async (req, res) => {
  try {
    const response = await getCityList();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting city list"
    })
  }
};

export const searchBusController = async (req, res) => {
  try {
    const response = await searchBus(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while searching bus details"
    })
  }
};

export const getSeatLayoutController = async (req, res) => {
  try {
    const response = await getSeatLayout(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting seat layout"
    })
  }
};

export const blockSeatController = async (req, res) => {
  try {
    const response = await blockSeat(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while blocking seat"
    })
  }
};

export const bookSeatController = async (req, res) => {
  try {
    const response = await bookSeat(req.params.ticketKey);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while booking seat"
    })
  }
};

export const cancelTicketController = async (req, res) => {
  try {
    const response = await cancelTicket(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while cancelling ticket"
    })
  }
};