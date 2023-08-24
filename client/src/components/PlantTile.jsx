import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import './PlantTile.css'

const PlantTile = ({ plant, myPlants, setMyPlants, setEditPlant }) => {
  const [ alert, setAlert ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ dataTimestamp, setDataTimestamp] = useState('');

  useEffect(() => {
    // check temp reading
    if (plant.temp < 65) {
      setMessage((plant.temp < 50) ? `A BIT TOO COLD!!`: `a little chilly`);
    } else if (plant.temp > 75) {
      setMessage((plant.temp > 85) ? `A BIT TOO HOT!!`: `a little warm`);
    } else {
      setMessage(`temperature is juuust right`);
    }

    setDataTimestamp(dayjs(plant.latestTime).format('dddd, MMMM D, YYYY[ at ]HH:mm'));

    // check moisture sensor reading against water level/water frequency??
    // check humifity sensor against ??? standard plant humidity/temp or species specific info from API??

    // check light reading sunlight levels for specific API data
  }, [])
  const onEdit = (e) => {
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
    // setMyPlants(myPlants.filter(plant => {
    //   return plant.id !== parseInt(id)
    // }));
    };

    // { zone: [ minTemp, maxTemp ] }
    const hardinessZones = {
      1: [-60, -50],
      2: [-50, -40],
      3: [-40, -30],
      4: [-30, -20],
      5: [-20, -10],
      6: [-10, 0],
      7: [0, 10],
      8: [10, 20],
      9: [20, 30],
      10: [30, 40],
      11: [40, 50],
      12: [50, 60],
      13: [60, 90],
    };

  return (
    <div className='tile'>
      <span className='nameHeading'>{plant.name}</span>
      <span className='speciesHeading'>{plant.species}</span>
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
          <span>Temperature: {plant.temp} {message}</span>
          <span>Humidity: {plant.humidity}</span>
          <span>Light: {plant.light}</span>
          <span>Soil Moisture: {plant.moisture}</span>
          <span className='timeStamp'>Conditions as of {dataTimestamp}</span>
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