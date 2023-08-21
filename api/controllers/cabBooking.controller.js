import {
	createCabBooking,
	getCabBookingsByUser,
	cancelCabBooking
} from '../service/carBooking.service.js';

export const createCabBookingController = async (req, res) => {
	try {
		const result = await createCabBooking(req.body);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while creating a cab booking" });
	}
};

export const getCabBookingsByUserController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await getCabBookingsByUser(id);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while fetching cab bookings" });
	}
};

export const cancelCabBookingController = async (req, res) => {
	try {
		const { bookingId } = req.params;
		const result = await cancelCabBooking(bookingId);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while canceling the booking" });
	}
};
