# Real-Time Weather Forecast & Climate Telemetry App

A full-stack weather telemetry web application built with HTML5, CSS3 (Flexbox), Vanilla JavaScript (async, await, fetch, try, catch, Array.map()`), and a Node.js + Express backend[cite: 1, 8].

## Features

- **Real-Time Weather Metrics:** Displays current temperature, weather description with dynamic icons, humidity, wind speed, and atmospheric pressure for searched cities[cite: 1].
- **5-Day Forecast:** Renders a 5-day forecast using Array.map() inside a responsive CSS Flexbox layout[cite: 1].
- **Dynamic Background Gradients:** Smoothly transitions page themes based on sunny/clear, rainy, overcast/default, or nighttime conditions[cite: 1].
- **Graceful Loading & Error Handling:** Shows a loading spinner during asynchronous requests and clear error messages for unknown cities or network issues[cite: 1].
- **Express Backend API:** Serves the frontend from public/ and exposes /api/weather with environment-based configuration (.env) and response caching[cite: 8].