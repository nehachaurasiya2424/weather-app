import React, { useState, useEffect } from "react";
import "./Weather.css";
import sun from "../Images/sun.png";
import moon from "../Images/moon.png";
import d_cloud from "../Images/02d-fcloudy.png";
import n_cloud from "../Images/02n-fclouds.png";
import scatteredCloud from "../Images/03dn-sclouds.png";
import d_bCloud from "../Images/04d-bclouds.png";
import n_bCloud from "../Images/04n-bclouds.png";
import d_shower from "../Images/09d-shower.png";
import n_shower from "../Images/09n-shower.png";
import rain from "../Images/10dn-rain.png";
import thunderstorm from "../Images/11dn-thunderstorm.png";
import snow from "../Images/13dn-snow.png";
import mist from "../Images/50dn-mist.png";
import humidity from "../Images/humidity.png";
import windSpeed from "../Images/wind.png";
import search_icon from "../Images/search.png";
import day from "../Background/01d-clearsky.jpg";
import night from "../Background/night.jpg";
import few_dclouds from "../Background/02d-fcloud.jpg";
import few_nclouds from "../Background/02n-fclouds.jpg";
import scattered_cloud from "../Background/03dn-sclouds.jpg";
import broken_cloud from "../Background/04dn-bclouds.jpg";
import shower from "../Background/shower-rain.jpg";
import rain_b from "../Background/rain.jpg";
import thunderstorm_b from "../Background/thunderstorm.jpg";
import mist_b from "../Background/mist.jpg";
import snow_b from "../Background/snow.jpg";
import feel from "../Images/feel.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const allIcons = {
    "01d": sun,
    "01n": moon,
    "02d": d_cloud,
    "02n": n_cloud,
    "03d": scatteredCloud,
    "03n": scatteredCloud,
    "04d": d_bCloud,
    "04n": n_bCloud,
    "09d": d_shower,
    "09n": n_shower,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const getBackground = (icon) => {
    switch (icon) {
      case "01d":
        return day;
      case "01n":
        return night;
      case "02d":
        return few_dclouds;
      case "02n":
        return few_nclouds;
      case "03d":
        return scattered_cloud;
      case "03n":
        return scattered_cloud;
      case "04d":
        return broken_cloud;
      case "04n":
        return broken_cloud;
      case "09d":
        return shower;
      case "09n":
        return shower;
      case "10d":
        return rain_b;
      case "10n":
        return rain_b;
      case "11d":
        return thunderstorm_b;
      case "11n":
        return thunderstorm_b;
      case "13d":
        return snow_b;
      case "13n":
        return snow_b;
      case "50d":
        return mist_b;
      case "50n":
        return mist_b;
      default:
        return day;
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=183de74f39a971fda06333aa423c66a0`;
      const response = await fetch(url);
      const resJson = await response.json();
      const icon = allIcons[resJson.weather[0].icon];
      const background = getBackground(resJson.weather[0].icon);
      console.log(background);
      console.log(url);
      console.log(resJson);
      setWeatherData({
        humidity: resJson.main.humidity,
        feels_like: resJson.main.feels_like,
        max_temp: resJson.main.temp_max,
        windSpeed: resJson.wind.speed,
        temperature: Math.floor(resJson.main.temp),
        location: resJson.name,
        description: resJson.weather[0].description,
        icon: icon,
        background: background,
      });
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchTerm);
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <>
      <div className="main-div">
        <div
          className="weather"
          style={{
            backgroundImage: `url(${weatherData?.background || day})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black",
          }}
        >
          <div className="main-search">
            <div class="search">
              <input
                placeholder="Search..."
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div className="button-div">
                <button type="submit" onClick={handleSubmit}>
                  <img
                    src={search_icon}
                    alt="search-icon"
                    className="search-icon"
                  />
                </button>
              </div>
            </div>
          </div>
          {weatherData ? (
            <div>
              <div className="main-w">
                <h2 className="city">{weatherData.location}</h2>
                <img src={weatherData.icon} alt="no-img " className="w-icon" />
                <p className="desc">{weatherData.description}</p>
                <p className="temp">{weatherData.temperature}°C</p>
              </div>

              <div className="moreData ">
                <div className="moreDetails">
                  <div className="m-data">
                    <p>Humidity</p>
                    <img src={humidity} alt="no-img" className="more-icon" />
                    <p className="last"> {weatherData.humidity}%</p>
                  </div>
                </div>
                <div className="moreDetails">
                  <div className="m-data">
                    <p>Wind Speed</p>
                    <img src={windSpeed} alt="no-img" className="more-icon" />
                    <p className="last"> {weatherData.windSpeed} m/s</p>
                  </div>
                </div>
              </div>

              <div className="moreData ">
                <div className="moreDetails">
                  <div className="m-data">
                    <p>feel like</p>
                    <img src={feel} alt="no-img" className="more-icon" />
                    <p className="last"> {weatherData.feels_like}%</p>
                  </div>
                </div>
                <div className="moreDetails">
                  <div className="m-data">
                    <p>max-temp</p>
                    <img src={windSpeed} alt="no-img" className="more-icon" />
                    <p className="last"> {weatherData.max_temp} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No data found...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
