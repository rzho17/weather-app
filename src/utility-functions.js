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

export default getCity;
