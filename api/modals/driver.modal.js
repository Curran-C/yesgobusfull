import mongoose from "mongoose";

const { Schema } = mongoose;

const driverSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phNum: {
      type: String,
      required: true
    },
    profileUrl: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    aadhar: {
      type: String,
    },
    pancard: {
      type: String,
    },
    drivinglicense: {
      type: String,
    },
    documentFrontUrl: {
      type: String,
      // required: true,
    },
    documentBackUrl: {
      type: String,
      // required: true,
    },
    accHolderName: {
      type: String,
      required: true
    },
    bankAccNum: {
      type: String,
      required: true
    },
    ifsc: {
      type: String,
      required: true
    },
    merchantTransactionId: {
      type: String,
    },
    paymentAmount: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    vehicleNumber: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
