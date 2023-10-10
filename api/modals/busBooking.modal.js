import mongoose from "mongoose";

const { Schema } = mongoose;

const boardingPointSchema = new Schema({
  id: String,
  location: String,
  time: String,
});

const droppingPointSchema = new Schema({
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
  userId: String,
  sourceCity: String,
  destinationCity: String,
  doj: Date,
  routeScheduleId: String,
  boardingPoint: boardingPointSchema,
  droppingPoint: droppingPointSchema,
  busOperator: String,
  busType: String,
  selectedSeats: String,
  customerName: String,
  customerLastName: String,
  customerEmail: String,
  customerPhone: String,
  emergencyPhNumber: String,
  blockSeatPaxDetails: [seatDetailsSchema],
  inventoryType: Number,
  totalAmount: Number,
  merchantTransactionId: String,
  bookingStatus: {
    type: String,
    default: "pending"
  },
  tid: String,
  buspnr: String,
  opPNR: String,
  totalRefundAmount: String,
  cancelChargesPercentage: String,
  cancellationCharges: String,
  pickUpTime: String,
  reachTime: String,
  cancellationPolicy:String,
  sentBookingRemainer: {
    type: String,
    default: false,
  },
},
  {
    timestamps: true,
  }
);


const BusBooking = mongoose.model("BusBooking", busBookingSchema);

export default BusBooking;