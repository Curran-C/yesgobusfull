// import axios from "axios";
import axiosInstance from "../utils/service";


export const googleLoginAPI = async (jwtToken) => {
  try {
    const { data } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/user/googleSignIn`, { jwtToken });
    return data;
  } catch (error) {
    console.error("Error logging in using google : ", error);
  }
};

export const facebookLoginAPI = async (fbResponse) => {
  try {
    const { data } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/user/facebooksignin`, fbResponse);
    return data;
  } catch (error) {
    console.error("Error logging in using facebook : ", error);
  }
};

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const cancelTicket = async (refundData, cancelTicketData, bookingId) => {
  try {
    const { data: cancelTicketResponse } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/busBooking/cancelTicket`, cancelTicketData);
    if (cancelTicketResponse.apiStatus?.success) {
      refundData.amount = parseFloat(cancelTicketResponse.totalRefundAmount);
      const { data: refundResponse } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/payment/refundPayment`, refundData);
      if (refundResponse) {
        const updateDetails = {
          bookingStatus: "cancelled",
          totalRefundAmount: cancelTicketResponse.totalRefundAmount,
          cancelChargesPercentage: cancelTicketResponse.cancelChargesPercentage,
          cancellationCharges: cancelTicketResponse.cancellationCharges,
        }
        const { data: updateBookingResponse } = await axiosInstance.patch(`${import.meta.env.VITE_BASE_URL}/api/busBooking/updateBooking/${bookingId}`, updateDetails);
        // send mail
        const mailBody = {
          fullName: updateBookingResponse?.data.customerName,
          sourceCity: updateBookingResponse?.data.sourceCity,
          destinationCity: updateBookingResponse?.data.destinationCity,
          seats: updateBookingResponse?.data.selectedSeats,
          amount: updateBookingResponse?.data.totalAmount,
          pickUpLocation: updateBookingResponse?.data.boardingPoint.location,
          opPNR: updateBookingResponse?.data.opPNR,
          doj: formatDate(updateBookingResponse?.data.doj),
          to: updateBookingResponse?.data.customerEmail,
        }
        const sendMail = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL
          }/api/busBooking/sendCancelTicketEmail`,
          mailBody
        );

        //send sms
        const messageBody = {
          fullName: updateBookingResponse?.data.customerName,
          sourceCity: updateBookingResponse?.data.sourceCity,
          destinationCity: updateBookingResponse?.data.destinationCity,
          seats: updateBookingResponse?.data.selectedSeats,
          amount: updateBookingResponse?.data.totalAmount,
          pickUpLocation: updateBookingResponse?.data.boardingPoint.location,
          opPNR: updateBookingResponse?.data.opPNR.split("/")[0],
          doj: formatDate(updateBookingResponse?.data.doj),
          to: updateBookingResponse?.data.customerPhone,
        }
        const sendMessage = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL
          }/api/busBooking/sendCancelTicketMessage`,
          messageBody,
        );

        return updateBookingResponse;
      }
    }
  } catch (error) {
    console.error("Error cancelling the ticket : ", error);
  }
};
