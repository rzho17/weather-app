import { parseISO, parse } from "date-fns";
import weatherFetch, { fetchFahrenheit } from "./api-functions";
import {
  clearForecast,
  makeForecastContainer,
  removeError,
  setFcLow,
  switchTempValue,
  updateFcImage,
  updateForecastInfo,
  updateWeatherInfo,
} from "./dom-functions";

let switched = "metric";

const switchDegree = (city) => {
  const fahrenheit = "imperial";
  const celsius = "metric";
  let isSwitched = false;
  //   let switched;

  return () => {
    clearForecast();
    //Allows the switch between metric and imperial units without having to double click after search
    if (switched === fahrenheit) {
      switched = "metric";
      weatherFetch(city, switched);
    } else {
      switched = switched === isSwitched ? celsius : fahrenheit;
      isSwitched = !isSwitched;
      weatherFetch(city, switched);
    }
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

    console.log(switched);
    weatherFetch(city, switched);
    clearForecast();

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
  if (minutes < 10) {
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

// forecast finder functions

export const findForecastLow = (forecast) => {
  let low = forecast.list[0].main.temp_max;
  let x = 0;

  //   console.log(low);
  for (let i = 0; i <= forecast.list.length; i += 8) {
    for (let j = i; j < i + 8; j++) {
      if (x >= 8) {
        x = 0;
        // console.log("low", low);
        // console.log("break");
        // setFcLow(low);
        // makeForecastContainer(null, null, null, low);
        if (i < forecast.list.length) {
          low = Math.round(forecast.list[j].main.temp_min);
        }
      }

      if (i < forecast.list.length) {
        if (forecast.list[j].main.temp_min < low) {
          low = Math.round(forecast.list[j].main.temp_min);
        }
      }

      x++;
    }
  }

  return low;
};

export const findForecastHigh = (forecast) => {
  let high = 0;
  //   let low = weatherData.list[0].main.temp_max;
  let index = 0;
  let x = 0;

  //   const highLow = temp;

  for (let i = 0; i <= forecast.list.length; i += 8) {
    //will set j to equal the previous value of i to find the daily high/low within each 5 day period
    //j will always loop through the most current i value to the i value + 8 to simulate a single day forecast
    //this will allow the function to find the daily high/low for each day
    for (let j = i; j < i + 8; j++) {
      if (x >= 8) {
        // console.log(i);
        x = 0;
        // index = 0;
        // console.log("top", high);
        // console.log(index);
        // updateFcImage(forecast);
        makeForecastContainer(forecast, index, high, findForecastLow(forecast));

        // console.log("break");
        if (i < forecast.list.length) {
          high = Math.round(forecast.list[j].main.temp_max);
          index = j;
          //   console.log(high);
        }
      }

      if (i < forecast.list.length) {
        if (forecast.list[j].main.temp_max > high) {
          high = Math.round(forecast.list[j].main.temp_max);
          index = j;
        }
      }

      x++;
    }
  }
  switchTempValue(switched);

  //   let low = forecast.list[0].main.temp_max;
  //   let y = 0;

  //   //   console.log(low);
  //   for (let i = 0; i <= forecast.list.length; i += 8) {
  //     for (let j = i; j < i + 8; j++) {
  //       if (y >= 8) {
  //         y = 0;
  //         console.log("low", low);
  //         console.log("break");
  //         // setFcLow(low);
  //         makeForecastContainer(forecast, index, high, low);
  //         // makeForecastContainer(null, null, null, low);
  //         if (i < forecast.list.length) {
  //           low = Math.round(forecast.list[j].main.temp_min);
  //         }
  //       }

  //       if (i < forecast.list.length) {
  //         if (forecast.list[j].main.temp_min < low) {
  //           low = Math.round(forecast.list[j].main.temp_min);
  //         }
  //       }

  //       y++;
  //     }
  //   }
};

export const findWindSpeed = (windSpeed) => {
  if (switched === "metric") {
    const kmh = Math.round((windSpeed * 3600) / 1000);
    return kmh;
  }
  const mph = Math.round(windSpeed);
  return mph;
};

export default getCity;
