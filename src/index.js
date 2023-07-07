const weatherFetch = async (city) => {
  const apiKey = "214203c486864879e59c9aa802929646";
  try {
    const currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const result = await currentWeather.json();

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&appid=${apiKey}&units=metric`
    );
    const forecastResult = await forecast.json();

    console.log(result);
    console.log(forecastResult);
  } catch (error) {
    console.log(error);
  }
};

weatherFetch("vancouver");
// weatherFetch();
// console.log(weatherFetch("germany"));
