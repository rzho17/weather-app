import weatherFetch from "./api-functions";
import { removeError, updateWeatherInfo } from "./dom-functions";

const getCity = () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const city = formData.get("city");

    form.reset();

    weatherFetch(city);
    removeError();
  });
};

// Date functions
export const getCurrentDate = (dt, timezone) => {
  const utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10);
  const utcMilliseconds = utcSeconds * 1000;
  const localDate = new Date(utcMilliseconds);
  //   const localDate = new Date(utcMilliseconds).toUTCString();

  return localDate;
};

export const findMonth = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month];
};

export const findDay = (day) => {
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return dayNames[day];
};

export default getCity;
