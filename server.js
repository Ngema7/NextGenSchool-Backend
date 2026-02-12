const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/marquee", require("./routes/marquee.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/events", require("./routes/events.routes"));


// db connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
