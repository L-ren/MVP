import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import './PlantTile.css'

const PlantTile = ({ plant, myPlants, setMyPlants, setEditPlant }) => {
  const onEdit = (e) => {
    console.log(myPlants);
    const id = e.target.className;
    setEditPlant(id);
  }
  const onDelete = (e) => {
    const id = e.target.className;
    axios.delete(`http://localhost:3000/plants/${id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setMyPlants(myPlants.filter(plant => (plant.id !== parseInt(id))));
    let dayjsTime = dayjs(plant.time);
  }

  return (
    <div className='tile'>
      <h4>{plant.name}</h4>
      <h5>{plant.species}</h5>
      <div className='tileData'>
        <div className='staticData'>
          <span>Sunlight: {plant.sunlight}</span>
          <span>Water Frequency: {plant.waterFreq}</span>
          <span>Maintenance: {plant.maintenance}</span>
        </div>
        {/* only show live data if available */}
        { (plant.temp && plant.light && plant.moisture) &&
        <div className='sensorData'>
          {/* <h5>Current conditions</h5> */}
          <span>Temperature: {plant.temp}</span>
          <span>Humidity: {plant.humidity}</span>
          <span>Light: {plant.light}</span>
          <span>Soil Moisture: {plant.moisture}</span>
          <span className='timeStamp'>Conditions as of {dayjs(plant.time).format('dddd, MMMM D, YYYY[ at ]HH:mm')}</span>
        </div>}
      </div>
      <div className = "tileButtons">
        <button onClick={onEdit} className={plant.id}>edit</button>
        <button onClick={onDelete} className={plant.id}>delete</button>
      </div>
    </div>
  );
};

export default PlantTile;