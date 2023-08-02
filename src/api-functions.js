import {
  showError,
  updateDetailBox,
  updateForecastInfo,
  updateWeatherInfo,
} from "./dom-functions";

const forecastFetch = async (lat, lon, apiKey, unit) => {
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
  );
  const forecastResult = await forecast.json();

  console.log(forecastResult);
  updateForecastInfo(forecastResult);
};

const weatherFetch = async (city, unit) => {
  const apiKey = "214203c486864879e59c9aa802929646";

  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );

    const result = await currentWeather.json();

    forecastFetch(result.coord.lat, result.coord.lon, apiKey, unit);

    updateWeatherInfo(result);

    updateDetailBox(result);
  } catch (error) {
    console.log(error);

    showError();
  }
};

export const fetchFahrenheit = async (city) => {
  const apiKey = "214203c486864879e59c9aa802929646";

  try {
    const weatherFah = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );

    const fahResult = await weatherFah.json();

    forecastFetch(fahResult.coord.lat, fahResult.coord.lon, apiKey);

    updateWeatherInfo(fahResult);
  } catch (error) {
    console.log(error);

    showError();
  }
};

export default weatherFetch;
