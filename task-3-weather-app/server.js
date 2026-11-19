require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Simple in-memory cache (10 minutes)
const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
  const rawCity = (req.query.city || '').trim();

  if (!rawCity) {
    return res.status(400).json({ error: 'Please provide a city name.' });
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: 'Server configuration error: OPENWEATHER_API_KEY is missing in .env.'
    });
  }

  const cacheKey = rawCity.toLowerCase();
  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS) {
    return res.json(cachedEntry.data);
  }

  try {
    const encodedCity = encodeURIComponent(rawCity);
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&units=metric&appid=${API_KEY}`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (currentRes.status === 404 || forecastRes.status === 404) {
      return res.status(404).json({ error: `City "${rawCity}" not found.` });
    }

    if (!currentRes.ok || !forecastRes.ok) {
      return res.status(502).json({ error: 'Failed to retrieve weather data from provider.' });
    }

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json()
    ]);

    // Pick one forecast entry per day (preferring ~12:00:00, falling back to available slots)
    const dailyMap = new Map();
    for (const item of forecastData.list || []) {
      const dateKey = item.dt_txt.split(' ')[0];
      if (!dailyMap.has(dateKey) || item.dt_txt.includes('12:00:00')) {
        dailyMap.set(dateKey, item);
      }
    }

    const fiveDayForecast = Array.from(dailyMap.values())
      .slice(0, 5)
      .map((entry) => ({
        date: entry.dt_txt,
        temp: entry.main.temp,
        tempMin: entry.main.temp_min,
        tempMax: entry.main.temp_max,
        condition: entry.weather?.[0]?.main || 'Clear',
        description: entry.weather?.[0]?.description || '',
        icon: entry.weather?.[0]?.icon || '01d'
      }));

    const payload = {
      city: currentData.name,
      country: currentData.sys?.country || '',
      temperature: currentData.main.temp,
      condition: currentData.weather?.[0]?.main || 'Clear',
      description: currentData.weather?.[0]?.description || '',
      icon: currentData.weather?.[0]?.icon || '01d',
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      pressure: currentData.main.pressure,
      isNight: (currentData.weather?.[0]?.icon || '').endsWith('n'),
      forecast: fiveDayForecast
    };

    cache.set(cacheKey, { timestamp: Date.now(), data: payload });
    return res.json(payload);
  } catch (err) {
    console.error('Weather API error:', err);
    return res.status(500).json({ error: 'Network or server error while fetching weather.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});