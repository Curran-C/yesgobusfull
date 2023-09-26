import {
  initiatePayment,
  checkPaymentStatus,
  refundPayment,
} from "../service/payment.service.js";

export const initiatePaymentController = async (req, res) => {
  try {
    const response = await initiatePayment(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while initiating payment"
    })
  }
};

export const checkPaymentStatusController = async (req, res) => {
  try {
    const response = await checkPaymentStatus(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while checking payment status"
    })
  }
};

export const refundPaymentController = async (req, res) => {
  try {
    const response = await refundPayment(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while refunding payment"
    })
  }
};