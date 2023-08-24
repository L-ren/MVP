import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const AddPlantManual = ({ newPlantManual, setNewPlantManual }) => {
  const [sunlight, setSunlight] = useState(''); // sliding scale
  const [watering, setWatering] = useState(''); // sliding scale
  /* CREATE SLIDER FOR SUNLIGHT/WATERING NEEDS */

  const onSubmitClick = (e) => {
    e.preventDefault();
    console.log('manual plant input submitted');
    // create new server path for manual input
  };

  return ReactDOM.createPortal((
    <div className="modalBackground">
      <div className="addPlantManual">
        <button className="xButton" onClick={() => setNewPlantManual(false)}>X</button>
        <form onSubmit={onSubmitClick}>
        <h3>Please Manually Input Plant Care info</h3>
          <span>Name: {newPlantManual.name}</span>
          <span>Species: {newPlantManual.species}</span>
          Sunlight: <input type="text" onChange={(e)=>setSunlight(e.target.value)}></input>
          Watering: <input type="text" onChange={(e)=>setWatering(e.target.value)} required></input>
          <button type="submit" className="submitButton">Submit</button>
        </form>
      </div>
    </div>
  ), document.getElementById("portal"));
}

export default AddPlantManual;