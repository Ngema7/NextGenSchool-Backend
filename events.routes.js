const router = require("express").Router();
const Event = require("./models/event");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD event
router.post("/", async (req, res) => {
  try {
    const { title, date, time } = req.body;

    if (!title || !date || !time)
      return res.status(400).json({ message: "All fields required" });

    const newEvent = await Event.create({ title, date, time });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
