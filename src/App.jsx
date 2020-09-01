import React, { useState } from "react";
const api = {
  key: "6b50ca070b0c6a195fea81c23dddf77b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const checkError = (error) => {
    switch (error) {
      case "404":
        return "Place not found..";
      case "400":
        return "Please, enter your place..";
      default:
        return "Oops.. Something went wrong:/";
    }
  };
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          if (result.cod === "undefined") {
            setQuery("");
            setError("");
          } else {
            let errMessage = checkError(result.cod);
            setError(errMessage);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const changeBackground = (w) => {
    switch (w) {
      case "Clear":
        return "app clear";
      case "Sunny":
        return "app warm";
      case "Clouds":
        return "app cold";
      case "Rain":
        return "app rain";
        case "Thunderstorm":
          return "app thunderstorm"
      case "Snow":
        return "app snow";
      default:
        return "app clouds";
    }
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? changeBackground(weather.weather[0].main)
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="location-box">
            <div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="error-message">{error}</div>
        )}
      </main>
    </div>
  );
}

export default App;
