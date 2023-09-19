import mongoose from "mongoose";

const { Schema } = mongoose;

const bankSchema = new Schema(
  {
    id_number: {
      type: String,
      required: true
    },
    ifsc: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    }
  },
);

const BankModal = mongoose.model("Bank", bankSchema);

export default BankModal;