import { parseISO, parse } from "date-fns";
import weatherFetch, { fetchFahrenheit } from "./api-functions";
import { removeError, updateWeatherInfo } from "./dom-functions";

const getDegree = (degree) => {
  const test = degree;
  console.log(test);
  //   console.log("yo");
  return test;
};

let switched = "celsius";

const switchDegree = (city) => {
  const fahrenheit = "imperial";
  const celsius = "metric";
  let isSwitched = false;
  //   let switched;

  return () => {
    // console.log(switched);
    if (switched === fahrenheit) {
      switched = "metric";
      weatherFetch(city, switched);
    } else {
      switched = isSwitched ? celsius : fahrenheit;
      isSwitched = !isSwitched;
      weatherFetch(city, switched);
    }
    // console.log(city);
    // getDegree(switched);
  };
};

let currentEvent = null;

export const setFahrenheit = (city) => {
  const tempContainer = document.querySelector(".currentTempContainer");

  //ensures the event will be the same instead of a new event being created and attached for each call on setFahrenheit
  if (currentEvent !== null) {
    tempContainer.removeEventListener("click", currentEvent);
  }

  currentEvent = switchDegree(city);

  tempContainer.addEventListener("click", currentEvent);
};

const getCity = (() => {
  const form = document.querySelector("form");

  let city;

  //   console.log("hi");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    city = formData.get("city");

    // console.log(switched);
    weatherFetch(city, switched);

    setFahrenheit(city);
    removeError();

    form.reset();

    // city.reset();
  });

  //   setFahrenheit(city);
})();

// Date functions
export const getLocalDate = (dt, timezone) => {
  //takes current time in unix, timezone difference, and adds 7 hours to adjust for correct local time
  const utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10) + 25200;
  const utcMilliseconds = utcSeconds * 1000;
  const localDateString = new Date(utcMilliseconds).toUTCString();
  const localDate = new Date(localDateString);

  return localDate;
};

export const setLowMinutes = (minutes) => {
  if (minutes <= 10) {
    minutes = "0" + minutes.toString();
  }

  return minutes;
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
