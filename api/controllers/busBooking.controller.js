import {
  getCityList,
  searchBus,
  getSeatLayout,
  blockSeat,
  bookSeat,
  cancelTicket,
  getBusFilters,
  getBusDetails,
  bookBus,
  searchCity,
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

export const getBusFiltersController = async (req, res) => {
  try {
    const response = await getBusFilters(req.query);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting filters"
    })
  }
};

export const getBusDetailsController = async (req, res) => {
  try {
    const searchArgs = {
      sourceCity: req.body.sourceCity,
      destinationCity: req.body.destinationCity,
      doj: req.body.doj
    };
    let filters = {};
    if (req.body.boardingPoints !== null && req.body.boardingPoints?.length > 0) {
      filters.boardingPoints = req.body.boardingPoints;
    }
    if (req.body.droppingPoints !== null && req.body.droppingPoints?.length > 0) {
      filters.droppingPoints = req.body.droppingPoints;
    }
    if (req.body.busPartners !== null && req.body.busPartners?.length > 0) {
      filters.busPartners = req.body.busPartners;
    }
    if (req.body.minPrice !== null && req.body.minPrice !== undefined) {
      filters.minPrice = req.body.minPrice;
    }
    if (req.body.maxPrice !== null && req.body.maxPrice !== undefined) {
      filters.maxPrice = req.body.maxPrice;
    }
    const response = await getBusDetails(searchArgs, filters);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting bus details with filters",
    });
  }
};

export const bookBusController = async (req, res) => {
  try {
    const response = await bookBus(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while booking bus",
    });
  }
};

export const searchCityController = async (req, res) => {
  try {
    const response = await searchCity(req.params.searchParam);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while searching city",
    });
  }
};