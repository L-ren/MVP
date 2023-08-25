import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const AddPlantManual = ({ newPlantManual, setNewPlantManual }) => {
  const [sunlight, setSunlight] = useState('');
  const [watering, setWatering] = useState('');

  const sunlightValues = {
    0: 'part shade',
    1: 'part sun - part shade',
    2: 'part sun',
    3: 'full sun',
  };
  const wateringValues = {
    0: 'none',
    1: 'minimal (4 - 6 weeks)',
    2: 'average (2 - 4 weeks)',
    3: 'frequent (1 - 2 weeks)'
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    console.log(`${newPlantManual.name}, ${newPlantManual.species}, ${watering}, ${sunlight}`);
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
          <div className="wateringSlider">
            <input type="range" name="watering" min="0" max="3" onChange={(e) => setWatering(wateringValues[e.target.value])}></input>
            {/* <label htmlFor="watering">Watering</label> */}
            <div>{watering || 'slide scale to watering frequency'}</div>
          </div>
          <div className="sunlightSlider">
            <input type="range" name="sunlight" min="0" max="3" onChange={(e) => setSunlight(sunlightValues[e.target.value])}></input>
            {/* <label htmlFor="sunlight">Sunlight</label> */}
            <div>{sunlight || 'slide scale to sunlight level'}</div>
          </div>

          <button type="submit" className="submitButton">Submit</button>
        </form>
      </div>
    </div>
  ), document.getElementById("portal"));
}

export default AddPlantManual;