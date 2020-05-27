const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema(
  {
    ngo_name: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    description: { type: String },
    certificate_image: { type: String },
    reg_number: { type: String },
    contact_name: { type: String },
    contact_email: { type: String },
    contact_phone: { type: String },
    causes: { type: String },
    accessToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ngo", ngoSchema);
