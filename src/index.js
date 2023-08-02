import { setFahrenheit } from "./utility-functions";
import weatherFetch from "./api-functions";

weatherFetch("Vancouver", "metric");
setFahrenheit("Vancouver");
