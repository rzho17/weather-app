import { removeError, showError, updateWeatherInfo } from "./dom-functions";

const forecastFetch = async (lat, lon, apiKey) => {
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const forecastResult = await forecast.json();

  console.log(forecastResult);
};

const weatherFetch = async (city) => {
  const apiKey = "214203c486864879e59c9aa802929646";
  // const key = "d5ffae0a3ebc4d899a5204429230507";
  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      // `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      // `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=7&q=${city}`
    );

    const result = await currentWeather.json();

    forecastFetch(result.coord.lat, result.coord.lon, apiKey);

    updateWeatherInfo(result);

    // removeError();

    // console.log(result);
  } catch (error) {
    console.log(error);

    showError();
  }
};

// weatherFetch("vancouver");

export default weatherFetch;
