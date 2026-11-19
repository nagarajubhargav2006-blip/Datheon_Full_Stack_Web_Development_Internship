const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loadingEl = document.getElementById("loading");
const errorBoxEl = document.getElementById("error-box");
const errorMessageEl = document.getElementById("error-message");
const dashboardEl = document.getElementById("dashboard");

const cityNameEl = document.getElementById("city-name");
const weatherDescEl = document.getElementById("weather-desc");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const pressureEl = document.getElementById("pressure");
const forecastListEl = document.getElementById("forecast-list");

function mapWeatherCode(code, isDay = 1) {
  const suffix = isDay ? "d" : "n";
  if (code === 0) return { desc: "Clear sky", theme: "sunny", icon: `01${suffix}` };
  if (code <= 3) return { desc: "Partly cloudy", theme: "default", icon: `02${suffix}` };
  if (code <= 48) return { desc: "Foggy / overcast", theme: "default", icon: `50${suffix}` };
  if (code <= 67) return { desc: "Rainy", theme: "rainy", icon: `10${suffix}` };
  if (code <= 77) return { desc: "Snowfall", theme: "default", icon: `13${suffix}` };
  if (code <= 82) return { desc: "Rain showers", theme: "rainy", icon: `09${suffix}` };
  return { desc: "Thunderstorm", theme: "rainy", icon: `11${suffix}` };
}

function setLoading(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  dashboardEl.classList.add("hidden");
  errorMessageEl.textContent = message;
  errorBoxEl.classList.remove("hidden");
}

function clearError() {
  errorBoxEl.classList.add("hidden");
  errorMessageEl.textContent = "";
}

function updateBackgroundTheme(theme, isDay) {
  document.body.classList.remove("theme-sunny", "theme-rainy", "theme-night", "theme-default");
  if (!isDay) {
    document.body.classList.add("theme-night");
  } else {
    document.body.classList.add(`theme-${theme}`);
  }
}

async function fetchCoordinates(city) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding failed (HTTP ${response.status}).`);
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" was not found. Please check the spelling and try again.`);
  }
  return data.results[0];
}

async function fetchWeatherByCoords(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,wind_speed_10m",
    daily: "weather_code,temperature_2m_max",
    wind_speed_unit: "ms",
    forecast_days: "5",
    timezone: "auto"
  });
  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Unable to fetch weather telemetry (HTTP ${response.status}).`);
  }
  return response.json();
}

function renderCurrentWeather(location, weatherData) {
  const current = weatherData.current;
  const info = mapWeatherCode(current.weather_code, current.is_day);

  cityNameEl.textContent = `${location.name}, ${location.country_code}`;
  weatherDescEl.textContent = info.desc;
  temperatureEl.textContent = `${Math.round(current.temperature_2m)}°C`;
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windSpeedEl.textContent = `${current.wind_speed_10m} m/s`;
  pressureEl.textContent = `${Math.round(current.surface_pressure)} hPa`;

  weatherIconEl.src = `https://openweathermap.org/img/wn/${info.icon}@2x.png`;
  weatherIconEl.alt = info.desc;

  updateBackgroundTheme(info.theme, current.is_day);
}

function renderFiveDayForecast(weatherData) {
  const { time, weather_code, temperature_2m_max } = weatherData.daily;

  forecastListEl.innerHTML = time
    .map((dateStr, idx) => {
      const dateObj = new Date(`${dateStr}T00:00:00`);
      const dayLabel = dateObj.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric"
      });
      const info = mapWeatherCode(weather_code[idx], 1);
      const temp = Math.round(temperature_2m_max[idx]);

      return `
        <article class="forecast-card">
          <span class="forecast-day">${dayLabel}</span>
          <img
            class="forecast-icon"
            src="https://openweathermap.org/img/wn/${info.icon}@2x.png"
            alt="${info.desc}"
          />
          <span class="forecast-temp">${temp}°C</span>
          <span class="forecast-condition">${info.desc}</span>
        </article>
      `;
    })
    .join("");
}

async function loadWeatherForCity(city) {
  const trimmedCity = city.trim();
  if (!trimmedCity) {
    showError("Please enter a city name to search.");
    return;
  }

  clearError();
  dashboardEl.classList.add("hidden");
  setLoading(true);

  try {
    const location = await fetchCoordinates(trimmedCity);
    const weatherData = await fetchWeatherByCoords(location.latitude, location.longitude);

    renderCurrentWeather(location, weatherData);
    renderFiveDayForecast(weatherData);
    dashboardEl.classList.remove("hidden");
  } catch (error) {
    showError(error.message || "A network error occurred while fetching weather telemetry.");
  } finally {
    setLoading(false);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loadWeatherForCity(cityInput.value);
});

window.addEventListener("DOMContentLoaded", () => {
  loadWeatherForCity("Bengaluru");
});