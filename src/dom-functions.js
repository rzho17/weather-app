import { fromUnixTime } from "date-fns";
import {
  getLocalDate,
  findMonth,
  findDay,
  setLowMinutes,
  findForecastHigh,
  findForecastLow,
  findWindSpeed,
} from "./utility-functions";

const showForecastError = () => {
  const forecastWrapper = document.querySelector(".forecastWrapper");
  const errorText = document.createElement("div");
  errorText.className = "errorText";

  errorText.textContent = "Invalid Location Data :(";

  forecastWrapper.append(errorText);
};

export const showError = () => {
  const form = document.querySelector("form");

  const error = document.createElement("div");
  error.className = "error";

  error.textContent =
    "Location not found! Please search a city through 'city', 'city, state', 'city, country'.";

  showForecastError();

  form.append(error);
};

export const removeError = () => {
  const form = document.querySelector("form");
  const error = document.querySelector(".error");
  const forecastWrapper = document.querySelector(".forecastWrapper");
  const errorText = document.querySelector(".errorText");

  if (form.childElementCount > 1) {
    form.removeChild(error);
    forecastWrapper.removeChild(errorText);
  }
};

const testTime = (weatherTime) => {
  const currentDate = new Date(weatherTime);

  const currentTimeString = currentDate.toString();

  const time = parseInt(currentTimeString.substring(16, 18), 10);
  return time;
};

const switchTheme = (time) => {
  const currentTime = testTime(time);
  const body = document.querySelector("body");

  if (currentTime >= 20 || currentTime <= 7) {
    body.classList.remove("day");
  }
  if (currentTime > 6 && currentTime <= 19) {
    body.classList.remove("day");
    body.classList.toggle("day");
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

  switchTheme(date);

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

  const weatherCondition = weatherData.weather[0].description;
  const weatherConditionString =
    weatherCondition.charAt(0).toUpperCase() + weatherCondition.substring(1);

  weatherImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
  conditions.textContent = weatherConditionString;
  location.textContent = weatherData.name;
};

// forecast functions

export const clearForecast = () => {
  const forecast = document.querySelector(".forecast");

  forecast.textContent = "";
};

const switchCelToFah = (ele, variable) => {
  ele.forEach((item) => {
    if (variable === "metric") {
      item.textContent = "°C";
    } else {
      item.textContent = "°F";
    }
  });
};

const switchKmhToMph = (ele, variable) => {
  if (variable === "metric") {
    ele.textContent = "Km/h";
  } else {
    ele.textContent = "Mph";
  }
};
export const switchTempValue = (variable) => {
  const fcDegree = document.querySelectorAll(".forecastDetails .highlight");
  const weatherBoxDegrees = document.querySelectorAll(".highlight");
  const detailDegree = document.querySelectorAll(".dataDegree");
  const speedMetric = document.querySelector(".speedMetric");

  switchCelToFah(fcDegree, variable);
  switchCelToFah(weatherBoxDegrees, variable);
  switchCelToFah(detailDegree, variable);
  switchKmhToMph(speedMetric, variable);
};

export const switchTempText = (metric) => {
  const switchTempBtn = document.querySelector(".switchTempBtn");
  if (metric === "metric") {
    switchTempBtn.textContent = "Display °F";
  } else {
    switchTempBtn.textContent = "Display °C";
  }
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
  fcTempHigh.className = "fcTempInfo";

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
};

export const updateForecastInfo = (weatherData) => {
  clearForecast();
  findForecastHigh(weatherData);
  findForecastLow(weatherData);
};

export const updateDetailBox = (weatherData) => {
  const dailyHigh = document.querySelector(".dailyHigh");
  const dailyLow = document.querySelector(".dailyLow");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".windSpeed");

  const { main } = weatherData;
  const { wind } = weatherData;

  const high = Math.round(main.temp_max);
  const low = Math.round(main.temp_min);

  dailyHigh.textContent = high;
  dailyLow.textContent = low;
  humidity.textContent = main.humidity;
  windSpeed.textContent = findWindSpeed(wind.speed);
};

export const placeholder = () => {};
