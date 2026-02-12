const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

