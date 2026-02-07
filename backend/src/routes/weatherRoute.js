const express = require("express");
const fetch = require("node-fetch");
const authMiddleware = require("../middleware/authMiddleware");
const SearchHistory = require("../models/SearchHistory");

const router = express.Router();

// Get API key from OpenWeatherMap.org
const API_KEY = "7babae66533ed101fdb8730346a850a2";
;

//  Current weather
router.get("/current/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ message: data.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//  5-day forecast
router.get("/forecast/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== "200") {
      return res.status(404).json({ message: data.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Save search history
router.post("/save", authMiddleware, async (req, res) => {
  const { city, temperature, condition } = req.body;
  try {
    const newHistory = new SearchHistory({
      userId: req.user.id,
      city,
      temperature,
      condition,
    });
    await newHistory.save();
    console.log(`Saved history for user ${req.user.id}: ${city}`);
    res.status(201).json({ message: "Search saved successfully" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ message: "Error saving search history" });
  }
});

// Get search history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user.id })
      .sort({ searchDate: -1 })
      .limit(20);
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Error fetching search history" });
  }
});

module.exports = router;

