import {
  removeError,
  showError,
  updateForecastInfo,
  updateWeatherInfo,
} from "./dom-functions";
import { addForecastContainer, setFahrenheit } from "./utility-functions";

const forecastFetch = async (lat, lon, apiKey, unit) => {
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
  );
  const forecastResult = await forecast.json();

  console.log(forecastResult);
  // addForecastContainer(forecastResult);
  updateForecastInfo(forecastResult);
};

const weatherFetch = async (city, unit) => {
  const apiKey = "214203c486864879e59c9aa802929646";
  // const key = "d5ffae0a3ebc4d899a5204429230507";

  // console.log(unit);

  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      // `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      // `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=7&q=${city}`
    );

    const result = await currentWeather.json();

    forecastFetch(result.coord.lat, result.coord.lon, apiKey, unit);

    updateWeatherInfo(result);

    // console.log(city);

    // setFahrenheit(city);

    // removeError();

    // console.log(result);
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

// weatherFetch("vancouver");

export default weatherFetch;
