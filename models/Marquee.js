const mongoose = require("mongoose");

const marqueeSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Marquee", marqueeSchema);
