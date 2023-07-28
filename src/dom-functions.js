import { fromUnixTime, getDate } from "date-fns";
import {
  getLocalDate,
  findMonth,
  findDay,
  setLowMinutes,
  setFahrenheit,
  findForecastHighLow,
  findForecastHigh,
  findForecastLow,
} from "./utility-functions";

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
  let getMinutes = date.getMinutes();
  let getHours = date.getHours();

  getMinutes = setLowMinutes(getMinutes);
  getHours = setLowMinutes(getHours);

  const currentMonth = fromUnixTime(weatherData.dt);

  console.log(date);

  month.textContent = `
    ${findDay(date.getDay())} 
    ${date.getDate()}
    ${findMonth(date.getMonth())}  ${getHours}:${getMinutes}`;

  currentTemp.textContent = Math.round(weatherData.main.temp);

  realTemp.textContent = `Feels like ${Math.round(
    weatherData.main.feels_like
  )}`;

  //using destructuring to gather only the weather and icon needed from the api
  const { weather } = weatherData;

  const [{ icon }] = weather;

  weatherImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
  conditions.textContent = weatherData.weather[0].description;
  location.textContent = weatherData.name;
};

// forecast functions

export const clearForecast = () => {
  const forecast = document.querySelector(".forecast");

  forecast.textContent = "";
};

export const updateFcImage = (forecast, index) => {
  const [{ icon }] = forecast.list[index].weather;

  return `https://openweathermap.org/img/wn/${icon}.png`;
};

export const updateFcDate = (forecast, index) => {
  const date = new Date(forecast.list[index].dt_txt);
  const dayOfWeek = findDay(date.getDay());

  return dayOfWeek;
};

export const setFcLow = (low) => {
  const fcLow = document.querySelector(".fcTempInfo");
  fcLow.textContent = low;
};

export const makeForecastContainer = (forecastData, index, high, low) => {
  const forecast = document.querySelector(".forecast");
  forecast.className = "forecast";

  const fcInfo = document.createElement("div");
  fcInfo.className = "forecastInfo";

  const fcDetails = document.createElement("div");
  fcDetails.className = "forecastDetails";

  const fcDetailsImg = document.createElement("img");
  fcDetailsImg.className = "fcDetailsImg";

  const fcTimes = document.createElement("div");
  fcTimes.className = "fcTimes";

  const fcTime = document.createElement("div");
  fcTime.className = "fcTime";

  const fcLow = document.createElement("span");
  fcLow.className = "fcLow";
  const fcHigh = document.createElement("span");
  fcHigh.className = "fcHigh";

  const fcTemp = document.createElement("div");
  fcTemp.className = "fcTemp";

  const fcTempInfo = document.createElement("span");
  fcTempInfo.className = "fcTempInfo";

  const highlight = document.createElement("span");
  highlight.className = "highlight";

  const fcTempHigh = document.createElement("span");
  fcTempInfo.className = "fcTempInfo";

  const highlightHigh = document.createElement("span");
  highlightHigh.className = "highlight";

  //   const highlight = document.createElement("span");
  //   highlight.className = "highlight";

  fcDetailsImg.src = updateFcImage(forecastData, index);
  fcTime.textContent = updateFcDate(forecastData, index);
  fcTempInfo.textContent = low;
  fcTempHigh.textContent = high;
  highlight.textContent = "°C";
  highlightHigh.textContent = "°C";

  forecast.append(fcInfo);

  fcInfo.append(fcDetails);

  fcDetails.append(fcDetailsImg, fcTimes);

  fcTimes.append(fcTime, fcTemp);

  fcTemp.append(fcLow, fcHigh);

  fcLow.append(fcTempInfo, highlight);
  fcHigh.append(fcTempHigh, highlightHigh);

  //   console.log("hi");
};

export const updateForecastInfo = (weatherData) => {
  findForecastHigh(weatherData);
  findForecastLow(weatherData);
};

export const placeholder = () => {};
