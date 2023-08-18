import CabBooking from "../modals/cabbooking.modal.js";

// book cab
export const createCabBooking = async (req, res) => {
	try {
		const userId = req.body.userId;
		const newCabBooking = new CabBooking({
			...req.body,
			userId
		});
		await newCabBooking.save();
		res.status(200).send({ message: "Cab booking created successfully", data: newCabBooking });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: err });
	}
};

// Get cab bookings by user
export const getCabBookingsByUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const cabBookings = await CabBooking.find({ userId: userId });
		if(cabBookings.length === 0) {
			return res.status(200).send({ message: "No bookings found" });
		}
		res.status(200).send({ message: "Cab Booking Details retrived successfully", data: cabBookings});
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "An error occurred while fetching cab bookings." });
	}
};

//cancel cab booking
export const cancelCabBooking = async (req, res) => {
	const bookingId = req.params.bookingId;
	try {
			const canceledBooking = await CabBooking.findByIdAndUpdate(
					bookingId,
					{ status: "canceled" }
			);
			if (!canceledBooking) {
					return res.status(404).send({ message: "Booking not found." });
			}
			res.status(200).send({ message: "Booking canceled successfully", data: canceledBooking });
	} catch (err) {
			console.log(err);
			res.status(500).send({ message: "An error occurred while canceling the booking." });
	}
};
