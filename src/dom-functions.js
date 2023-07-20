import { fromUnixTime, getDate } from "date-fns";
import { getCurrentDate, findMonth, findDay } from "./utility-functions";

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

export const updateWeatherInfo = (obj) => {
  //   console.log(obj);
  console.log(obj);

  //   console.log(getCurrentDate(obj.dt, obj.timezone));

  const date = getCurrentDate(obj.dt, obj.timezone);

  //   console.log(date.getMonth());

  const today = document.querySelector(".today");
  const month = document.querySelector(".month");
  const currentTemp = document.querySelector(".currentTemp");
  const degree = document.querySelector(".highlight");
  const realTemp = document.querySelector(".realTemp");
  const weatherImg = document.querySelector(".tempDisplay");
  const location = document.querySelector(".location");

  const currentMonth = fromUnixTime(obj.dt);

  //   console.log(findMonth(currentMonth.getMonth()));

  month.textContent = `
    ${findDay(date.getDay())} 
    ${date.getDate()}
    ${findMonth(date.getMonth())}  `;
};

export const placeholder = () => {};
