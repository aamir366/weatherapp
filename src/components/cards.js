//card.js

import React, { useEffect, useState } from "react";
import "./cards.css";
import RemoveCity from "./removeCity";

const API_KEY = "744495058acf45ef9f6140324230411";

function Cards({ cities,selectedCities, notSelectedCities, clickFetchToAddCity, clickXToRemoveCity }) {
  const [weatherData, setWeatherData] = useState([]);
  //console.log("selectedCities:"+selectedCities);
  //console.log("notSelectedCities:"+notSelectedCities);

  async function fetchData(updatedCities) {
    setWeatherData([]);
    const dataPromises = updatedCities.map(async (city) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key= ${API_KEY}&q=${city}`
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

  
  function dayOrNight() {

    return weatherData.map((eachCityData) => {
      const isDayOrNot = eachCityData.weather.current.is_day ;
      console.log("isDayOrNot:"+isDayOrNot);
      return isDayOrNot;
    });
  } 
  

  useEffect(() => {
    fetchData(cities);
  }, [cities]);

  return (
    <div className="cardsDetails">
      {weatherData.map((eachCityData, index) => (
        <div 
        key={index} 
        className={`card ${dayOrNight()[index] ? "day" : "night"}`}>
          <RemoveCity 
            cityName={eachCityData.city}
            selectedCities={selectedCities}
            notSelectedCities={notSelectedCities}
            clickXToRemoveCity={clickXToRemoveCity} />
        
       
        <div onClick={() => clickFetchToAddCity(eachCityData.city)}>
            <div className="cityName">{eachCityData.city.toUpperCase()}</div>
         
          <div className="weatherInfo">
            <span className="temperature">
                 {(eachCityData.weather.current.temp_c )} °C
            </span> <br/>
            <span className="description">
                {eachCityData.weather.current.condition.text}
            </span> <br/>
            <span className="highLowTemp">
                H: {(eachCityData.weather.forecast.forecastday[0].day.maxtemp_c)}°C  &nbsp;
                L: {(eachCityData.weather.forecast.forecastday[0].day.mintemp_c)}°C  
            </span> <br/>
            <div className="humidity">
                HUMIDITY<br/>
                <span className="humidityDegree">
                    {eachCityData.weather.current.humidity} %   
                </span> 
            </div>
            <div className="windSpeed">
                WINDSPEED<br/>
                <span className="windSpeedInfo">
                {eachCityData.weather.current.wind_kph} km/h <br />
                </span>   
            </div>  
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;

