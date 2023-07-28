import getCity, { setFahrenheit, switched } from "./utility-functions";
import weatherFetch from "./api-functions";

// getCity();

weatherFetch("Vancouver", "metric");
setFahrenheit("Vancouver");
