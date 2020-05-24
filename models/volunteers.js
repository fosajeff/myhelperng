const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
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
  dob: Date,
  state: String,
  country: String,
  occupation: String,
  experience: String,
  reviews: [
    {
      title: String,
      content: String,
    },
  ],
  url: String,
  skills: [String],
  preferredVolunteerLocation: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
