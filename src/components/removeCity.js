// removeCity.js

import React from "react";
import "./removeCity.css"

function RemoveCity({ cityName, selectedCities, notSelectedCities, clickXToRemoveCity }) {
  const handleRemove = () => {
    console.log("City to be Removed:", cityName);
    selectedCities.forEach((element, index, array) => {
      if (element === cityName) {
        array.splice(index, 1);
        notSelectedCities.push(element);
      }
    });
    console.log("Remaining Cities:", selectedCities);
    console.log("not selected Cities:", notSelectedCities);

    clickXToRemoveCity(cityName, selectedCities);
  };

  return (
    <div className="rounded-circle bg-secondary p-2 mr-2" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className="btn btn-close"
        aria-label="Close"
        onClick={handleRemove}
      >
        <span aria-hidden="true"className="close-icon">&times;</span>
      </button>
    </div>
  );
}

export default RemoveCity;
