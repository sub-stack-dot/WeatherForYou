import express from "express";
import fetch from "node-fetch";

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

// ✅ 5-day forecast
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

export default router;
