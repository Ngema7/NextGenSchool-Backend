const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
