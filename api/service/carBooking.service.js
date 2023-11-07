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

export const getAllCabBookingByUser = async (driverId) => {
  try {
    const cabsWithBookingDetails = await Cab.aggregate([
      {
        $match: { driverId: driverId },
      },
      {
        $lookup: {
          from: "cabbookings",
          localField: "_id",
          foreignField: "cabId",
          as: "bookings",
        },
      },
      {
        $unwind: "$bookings"
      }
    ]);

    if (cabsWithBookingDetails.length === 0) {
      return {
        status: 404,
        message: "No cabs found for the driver.",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Cabs and Booking Details retrieved successfully",
      data: cabsWithBookingDetails,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An error occurred while fetching cab bookings.",
      data: [],
    };
  }
};

export const completeBooking = async (bookingId) => {
  try {
    const booking = await CabBooking.findByIdAndUpdate(bookingId, {
      status: "completed",
    });
    if (!booking) {
      return {
        status: 404,
        message: "Booking not found",
      };
    }
    // booking.status = "completed";
    // await booking.save();
    const cabId = booking.cabId;
    await Cab.findByIdAndUpdate(cabId, { cab_status: "available" });
    return {
      status: 200,
      message: "Booking completed successfully",
      data: booking,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An error occurred while completing the booking.",
      data: [],
    };
  }
};
