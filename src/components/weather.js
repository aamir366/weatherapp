//weather.js

import React, { useState } from "react";
import "./weather.css";
import AddCityButton from "./addCity";
import Cards from "./cards"; 
import Footer from "./footer";

function Weather() {
  const [selectedCities, setSelectedCities] = useState([]);         //  Create a state variable called Selected Cities that stores an array of selected cities

  function addNewCity(newCity) {                                       //  Add a new city to an array called selectedCities.
    setSelectedCities([...selectedCities, newCity]);

  };

  return (
    <div className="box">
      <div className="weather">
        <span className="title">Weather App</span>
        <AddCityButton onAddCity={addNewCity} />                     {/*Add a new city to an array called selectedCities.*/} 
      </div>

      <div>
        <Cards cities={selectedCities} />                          {/*rendering a custom React component named Cards and passing a prop called cities to it with the value of selectedCities.*/}
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Weather;

