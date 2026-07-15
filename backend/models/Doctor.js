const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    specialization: {
      type: String,
      required: true
    },

    experience: {
      type: Number,
      required: true
    },

    qualification: {
      type: String
    },

    hospital: {
      type: String
    },

    fees: {
      type: Number
    },

    phone: {
      type: String
    },

    email: {
      type: String
    },

    availableDays: [String],

    availableTime: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);