import mongoose from "mongoose";

const { Schema } = mongoose;

const boardingPointSchema = new Schema({
  id: String,
  location: String,
  time: String,
});

const seatDetailsSchema = new Schema({
  age: String,
  name: String,
  seatNbr: String,
  sex: String,
  fare: Number,
  totalFareWithTaxes: Number,
  ladiesSeat: Boolean,
  lastName: String,
  mobile: String,
  title: String,
  email: String,
  idType: String,
  idNumber: String,
  nameOnId: String,
  primary: Boolean,
  ac: Boolean,
  sleeper: Boolean,
});

const busBookingSchema = new Schema({
  sourceCity: String,
  destinationCity: String,
  doj: Date,
  routeScheduleId: String,
  boardingPoint: boardingPointSchema,
  customerName: String,
  customerLastName: String,
  customerEmail: String,
  customerPhone: String,
  customerAlternateNumber:String,
  customerGender: String,
  customerAge: String,
  emergencyPhNumber: String,
  customerAddress: String,
  customerState: String,
  blockSeatPaxDetails: [seatDetailsSchema],
  inventoryType: Number,
  totalAmount: Number,
});


const BusBooking = mongoose.model("BusBooking", busBookingSchema);

export default BusBooking;