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

export const clearForecast = () => {
  const forecast = document.querySelector(".forecast");

  forecast.textContent = "";
};

export const updateFcImage = (forecast, index) => {
  const [{ icon }] = forecast.list[index].weather;

  return `https://openweathermap.org/img/wn/${icon}.png`;
};

export const makeForecastContainer = (forecastData, index) => {
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
  fcTime.textContent = "sunday";
  fcTempInfo.textContent = "12";
  fcTempHigh.textContent = "25";
  highlight.textContent = "X";
  highlightHigh.textContent = "X";

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
  const fcDetailsImg = document.querySelector("fcDetailsImg");
  const fcTime = document.querySelector(".fcTime");
  const fcTempInfo = document.querySelector(".fcTempInfo");
  const highlight = document.querySelector(".highlight");
  const fcTempHigh = document.querySelector(".fcTempInfo");
  const highlightHigh = document.querySelector(".highlight");

  //   console.log(weatherData.list);

  //   console.log(weatherData.list.length);

  //   fcTempHigh.textContent = weatherData;
  findForecastHigh(weatherData);
  //   findForecastLow(weatherData);

  //   let high = 0;
  //   let low = weatherData.list[0].main.temp_max;
  //   let x = 0;

  //   //   console.log(low);
  //   for (let i = 0; i <= weatherData.list.length; i += 8) {
  //     for (let j = i; j < i + 8; j++) {
  //       if (x >= 8) {
  //         x = 0;
  //         console.log("low", low);
  //         console.log("break");
  //         if (i < weatherData.list.length) {
  //           low = Math.round(weatherData.list[j].main.temp_min);
  //         }
  //       }

  //       if (i < weatherData.list.length) {
  //         if (weatherData.list[j].main.temp_min < low) {
  //           low = Math.round(weatherData.list[j].main.temp_min);
  //         }
  //       }

  //       x++;
  //     }
  //   }

  //   weatherData.list.forEach((item, index) => {
  //     // console.log(item.main.temp_max);

  //     console.log(index);
  //     if (item.main.temp_max > high) {
  //       high = item.main.temp_max;
  //     }

  //   });

  //   console.log(high);
  //   console.log(low);
  //   console.log(weatherData.list);
};

const tempContainer = document.querySelector(".currentTempContainer");

tempContainer.addEventListener("click", makeForecastContainer);
export const placeholder = () => {};
