import mongoose from "mongoose";

const { Schema } = mongoose;

const citySchema = new Schema(
  {
    city_name: {
      type: String,
      required: true
    },
  },
);

const City = mongoose.model("City", citySchema);

export default City;