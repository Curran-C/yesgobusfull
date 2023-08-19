import mongoose from "mongoose";

const { Schema } = mongoose;

const cabBookingSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		cabId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cab',
			required: true
		},
		bookingType: {
			type: String,
			required: true
		},
		travellerName: {
			type: String,
			required: true
		},
		travellerAge: {
			type: Number,
			required: true
		},
		travellerGender: {
			type: String,
			// required: true
		},
		travellerEmail: {
			type: String,
			required: true
		},
		travellerPhoneNumber: {
			type: String,
			required: true
		},
		pincode: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		address: {
			type: String,
			// required: true
		},
		pickupLocation: {
			type: String,
			required: true
		},
		dropoffLocation: {
			type: String,
			required: true
		},
		pickupDateTime: {
			type: Date,
			required: true
		},
		totalAmount: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			default: "on progress"
		},
	},
	{
		timestamps: true,
	}
);

const CabBooking = mongoose.model("CabBooking", cabBookingSchema);

export default CabBooking;