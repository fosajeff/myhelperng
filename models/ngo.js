const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  ngo_name: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String },
  ngo_addr: { type: String },
  city: { type: String },
  state: { type: String },
  ngo_description: { type: String },
  facebook_page: { type: String },
  cetificate_image: { type: String },
  reg_number: { type: String },
  contact_name: { type: String },
  contact_email: { type: String },
  contact_phone: { type: Number },
  ngo_causes: { type: String, enum: ["children", "pregnant women", "..."] },
  accessToken: { type: String },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ngo", ngoSchema);
