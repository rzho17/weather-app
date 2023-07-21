import { fromUnixTime, getDate } from "date-fns";
import { getLocalDate, findMonth, findDay } from "./utility-functions";

export const showError = () => {
  const header = document.querySelector("header");

  const error = document.createElement("div");
  error.className = "error";

  error.textContent =
    "Location not found! Please search a city through 'city', 'city, state', 'city, country'.";

  header.appendChild(error);
};

export const removeError = () => {
  const header = document.querySelector("header");
  const error = document.querySelector(".error");

  if (header.childElementCount > 1) {
    header.removeChild(error);
  }
};

const createHighlight = () => {
  const location = document.querySelector(".location");
  const highlight = document.createElement("span");
  highlight.className = "highlight";
  highlight.textContent = "@";

  location.append(highlight);
};

export const updateWeatherInfo = (weatherData) => {
  console.log(weatherData);

  const date = getLocalDate(weatherData.dt, weatherData.timezone);

  const today = document.querySelector(".today");
  const month = document.querySelector(".month");
  const currentTemp = document.querySelector(".currentTemp");
  const degree = document.querySelector(".highlight");
  const realTemp = document.querySelector(".realTemp");
  const weatherImg = document.querySelector(".weatherImg");
  const conditions = document.querySelector(".conditions");
  const location = document.querySelector(".location");

  const currentMonth = fromUnixTime(weatherData.dt);

  month.textContent = `
    ${findDay(date.getDay())} 
    ${date.getDate()}
    ${findMonth(date.getMonth())}  ${date.getHours()}:${date.getMinutes()}`;

  currentTemp.textContent = Math.round(weatherData.main.temp);

  realTemp.textContent = `Feels like ${Math.round(
    weatherData.main.feels_like
  )}`;

  //   updateWeatherImg("01d.png");

  //   weatherImg.src = updateWeatherImg("01d.png");
  const icon = weatherData.weather[0].icon;

  //   console.log(west);

  weatherImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
  conditions.textContent = weatherData.weather[0].description;
  location.textContent = weatherData.name;
};

export const placeholder = () => {};
