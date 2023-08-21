import CabBooking from "../modals/cabbooking.modal.js";
import Cab from "../modals/cab.modal.js";

export const createCabBooking = async (bookingData) => {
  try {
    const userId = bookingData.userId;
    const newCabBooking = new CabBooking({
      ...bookingData,
      userId,
    });
    await newCabBooking.save();
    const cabId = bookingData.cabId;
    await Cab.findByIdAndUpdate(cabId, { cab_status: "booked" });
    return {
      status: 200,
      message: "Cab booking created successfully",
      data: newCabBooking,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

export const getCabBookingsByUser = async (userId) => {
  try {
    const cabBookings = await CabBooking.find({ userId: userId });
    
    if (cabBookings.length === 0) {
      return {
        status: 200,
        message: "No bookings found",
      };
    }
    
    return {
      status: 200,
      message: "Cab Booking Details retrieved successfully",
      data: cabBookings,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while fetching cab bookings.",
    };
  }
};

export const cancelCabBooking = async (bookingId) => {
  try {
    const canceledBooking = await CabBooking.findByIdAndUpdate(
      bookingId,
      { status: "canceled" }
    );
    
    if (!canceledBooking) {
      return {
        status: 404,
        message: "Booking not found",
      };
    }
    const cabId = canceledBooking.cabId;
    await Cab.findByIdAndUpdate(cabId, { cab_status: "available" });
    return {
      status: 200,
      message: "Booking canceled successfully",
      data: canceledBooking,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while canceling the booking.",
    };
  }
};
