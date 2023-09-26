import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const googleLoginAPI = async (jwtToken) => {
  try {
    const { data } = await axios.post("/api/user/googleSignIn", { jwtToken });
    return data;
  } catch (error) {
    console.error("Error logging in using google : ", error);
  }
};

export const facebookLoginAPI = async (fbResponse) => {
  try {
    const { data } = await axios.post("/api/user/facebooksignin", fbResponse);
    return data;
  } catch (error) {
    console.error("Error logging in using facebook : ", error);
  }
};

export const cancelTicket = async (refundData, cancelTicketData, bookingId) => {
  try {
    const { data: cancelTicketResponse } = await axios.post("/api/busBooking/cancelTicket", cancelTicketData);
    if (cancelTicketResponse.apiStatus?.success) {
      refundData.amount = parseFloat(cancelTicketResponse.totalRefundAmount);
      const { data: refundResponse } = await axios.post("/api/payment/refundPayment", refundData);
      if (refundResponse.success === "true") {
        const updateDetails = {
          bookingStatus: "cancelled",
          totalRefundAmount: cancelTicketResponse.totalRefundAmount,
          cancelChargesPercentage: cancelTicketResponse.cancelChargesPercentage,
          cancellationCharges: cancelTicketResponse.cancellationCharges,
        }
        const updateBookingResponse = await axios.patch(`/api/busBooking/updateBooking/${bookingId}`, updateDetails);
        return updateBookingResponse;
      }
    }
  } catch (error) {
    console.error("Error cancelling the ticket : ", error);
  }
};
