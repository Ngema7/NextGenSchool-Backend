const router = require("express").Router();
const News = require("../models/news");

// GET all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD news
router.post("/", async (req, res) => {
  try {
    const { title, date } = req.body;
    if (!title || !date) return res.status(400).json({ message: "Title and date required" });
    const newNews = await News.create({ title, date });
    res.status(201).json(newNews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE news
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
