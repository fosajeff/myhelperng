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
    mission_statement: { type: String },
    terms_and_condition: { type: String },
    volunteers: [
      {
        name: String,
        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
        },
        start_date: String,
        stay_number: String,
        stay_duration: String,
        no_volunteers: String,
        phone_number: String,
        state: String,
        other: String,
        occupation: String,
        age: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ngo", ngoSchema);
