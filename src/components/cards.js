//card.js

import React, { useEffect, useState } from "react";
import "./cards.css";
import RemoveCity from "./removeCity";

const API_KEY = "96dcde12375aa5c602bdfe5dd413bbde";

function Cards({ cities,selectedCities, notSelectedCities, clickFetchToAddCity, clickXToRemoveCity }) {
  const [weatherData, setWeatherData] = useState([]);
  //console.log("selectedCities:"+selectedCities);
  //console.log("notSelectedCities:"+notSelectedCities);
  

  async function fetchData(updatedCities) {
    setWeatherData([]);
    const dataPromises = updatedCities.map(async (city) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        if (response.ok) {
          const weatherInfo = await response.json();
          return { city, weather: weatherInfo };
        } else {
          throw new Error(`Failed to fetch data for ${city}`);
        }
      } catch (error) {
        alert(error.message);
        console.log(error.message);
        return { city, weather: null };
      }
    });
    const cityWeatherData = await Promise.all(dataPromises);
    setWeatherData(cityWeatherData);
  }

  useEffect(() => {
    fetchData(cities);
  }, [cities]);

  return (
    <div className="cardsDetails">
      {weatherData.map((eachCityData, index) => (
        <div key={index} className="card" onClick={() => clickFetchToAddCity(eachCityData.city)}>
            <div className="cityName">{eachCityData.city.toUpperCase()}</div>
         
          <div className="weatherInfo">
            <span className="temperature">
                 {(eachCityData.weather.main.temp - 273.15).toFixed(1)} 
            </span> <br/>
            <span className="description">
                {eachCityData.weather.weather[0].description}
            </span> <br/>
            <span className="highLowTemp">
                H: {(eachCityData.weather.main.temp_max - 273.15).toFixed(1)} &nbsp;
                L: {(eachCityData.weather.main.temp_min - 273.15).toFixed(1)}  
            </span> <br/>
            <div className="humidity">
                HUMIDITY<br/>
                <span className="humidityDegree">
                    {eachCityData.weather.main.humidity} % 
                    
                </span> 

            </div>
            <div className="windSpeed">
                WINDSPEED<br/>
                <span className="windSpeedInfo">
                {eachCityData.weather.wind.speed} km/h <br />
                </span>   
            </div>
              
          </div>
          
          <RemoveCity 
            cityName={eachCityData.city}
            selectedCities={selectedCities}
            notSelectedCities={notSelectedCities}
            clickXToRemoveCity={clickXToRemoveCity} />
        </div>
      ))}
    </div>
  );
}

export default Cards;

