// addcity.js

import React, { useEffect, useMemo, useState } from "react";
import "./addCity.css";
import Cards from "./cards"; 



function AddCityButton() {

    const initialCities = useMemo(() =>
        [
            "Hyderabad", 
            "Bangalore",
            "Jamshedpur",
            "New Delhi",
            "Mumbai",
            "Kolkata",
            "Vishakhapatnam",
            "Kanpur",
            "Patna",
            "Chandigarh",
            "Bhopal",
            "Australia",
            "Agra",
            "Chennai",
            "Amsterdam"
            
        ],[]);

    const [citySelectedByUser, setCitySelectedByUser] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);
    const [notSelectedCities, setNotSelectedCities] = useState(initialCities);

    /*console.log("selectedCities:"+selectedCities);
    console.log(selectedCities);
    console.log("notSelectedCities:");
    console.log(notSelectedCities);*/
    
 

    function handleCityChange(event) {                                  // action performed from front-end i.e user clicks on a city
        const selectedCity = event.target.value;
        setCitySelectedByUser(selectedCity);                             //  the variable now stores the city which is clicked
        if(!selectedCities.includes(selectedCity)){
            setSelectedCities(prevSelectedCities => [...prevSelectedCities, selectedCity]);
            setNotSelectedCities(prevNotSelectedCities => prevNotSelectedCities.filter(eachCity => eachCity !== selectedCity));
        }
    };
  


    function handleRemoveCity(cityToRemove){
        setSelectedCities((prevSelectedCities) =>{
        const newSelectedCities = [];                                                                   // stores the cities left after the city removed by user on click
        prevSelectedCities.forEach(eachCity => {                                                         
            if(eachCity !== cityToRemove){
                newSelectedCities.push(eachCity);
            }
        });
        //console.log(newSelectedCities);
        return newSelectedCities;
    });



    //from initial cities remove selected cities and store it in setNotSelectedities 
            let initialCitiesForCheck = [...initialCities];
            let selectedCitiesForCheck = [...selectedCities];
            console.log("initialCitiesForCheck:"+initialCitiesForCheck);
            console.log("selectedCitiesForCheck:"+selectedCitiesForCheck);

            let sortedArray = initialCitiesForCheck.filter(city => !selectedCitiesForCheck.includes(city));
            console.log("Aamir : sorted Array:"+sortedArray);

            setNotSelectedCities(sortedArray);   
    }
    useEffect(() =>{                                                                    // initially set array[0] by default as selected city            
        setCitySelectedByUser();
    },[initialCities]);

   

    return (
        <div className="content">
            <div className="add-city-button">
                <select value={citySelectedByUser} onChange={handleCityChange}>           {/* Calls function handle City Change*/}      
                <option value="">Select a city</option>
                {notSelectedCities.map((eachCity, index) => (
                <option key = {index} value = {eachCity}>
                    {eachCity}
                </option>
                ))}
                </select>
            </div>
            <Cards                                                            
                cities={selectedCities}  
                selectedCities={selectedCities} 
                notSelectedCities={notSelectedCities}
                clickFetchToAddCity={(city) => console.log("Card clicked:", city)}
                clickXToRemoveCity={(city) => handleRemoveCity(city)}
                />                             
        </div>
    );
}

export default AddCityButton;

