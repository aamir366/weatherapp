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
            "Mumbai",
            "Delhi",
            "Mumbai",
            "Delhi",
            "Kolkata",
            "Vishakhapatnam",
            "Kanpur",
            "Patna",
            "Chandigarh",
            "Bhopal",
            "Ahmedabad",
            "Agra",
            "Chennai",
            "Pune"
            
        ],[]);

    const [citySelectedByUser, setCitySelectedByUser] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);
    const [notSelectedCities, setNotSelectedCities] = useState(initialCities);

  
    /*console.log("selectedCities:"+selectedCities);
    console.log(selectedCities);
    console.log("notSelectedCities:");
    console.log(notSelectedCities);*/
    
 

    function handleCityChange(event) {                                  // action performed from front-end i.e user clicks on a city
        setCitySelectedByUser(event.target.value);                     //  the variable now stores the city which is clicked
    };
  

    function handleAddCity (){                                                     
        if(citySelectedByUser.length === 0 || selectedCities.includes(citySelectedByUser)){                              //do not return anything if nothing is selected
            return null;
        }                                                                    
    
        setSelectedCities(prevSelectedCities =>[...prevSelectedCities, citySelectedByUser]);                // update the selected cities list by adding a new city to the existing array of selected cities
        setNotSelectedCities((prevNotSelectedCities) => {
        const newNotSelectedCities = [];
        prevNotSelectedCities.forEach(eachCity => {
            if(eachCity !== citySelectedByUser){                                                            // stores all the city which is not selected by user to new not selected cities array
                newNotSelectedCities.push(eachCity);
            }
        });
        return newNotSelectedCities;      
        });        
   
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
        setCitySelectedByUser(initialCities[0]);
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
                <button onClick={handleAddCity}>Fetch</button>              {/* Calls function handle Add City*/}
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

