import mongoose from "mongoose";

const { Schema } = mongoose;

const cabSchema = new Schema(
  {
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    },
    cabNumberPlate: {
      type: String,
      required: true
    },
    cabImageUrl: {
      type: String,
      // required: true
    },
    seatingCapacity: {
      type: Number,
      required: true
    },
    cabModel: {
      type: String,
      required: true
    },
    cabType: {
      type: String,
      required: true
    },
    estimatedKm: {
      type: Number,
      required: true
    },
    estimatedKmPrice: {
      type: Number,
      required: true
    },
    priceAfterEstimatedKm: {
      type: Number,
      required: true
    },
    hourlyRentalPrice: {
      type: Number,
      required: true
    },
    taxPercentage: {
      type: Number,
      required: true
    },
    fuelType: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    cab_status: {
      type: String,
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

const Cab = mongoose.model("Cab", cabSchema);

export default Cab;