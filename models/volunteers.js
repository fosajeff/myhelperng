const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    about: String,
    address: String,
    dob: String,
    state: String,
    experience: String,
    url: String,
    reviews: [
      {
        title: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
