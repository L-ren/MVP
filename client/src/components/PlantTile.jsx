import React from 'react';
import axios from 'axios';

const PlantTile = ({ plant, myPlants, setMyPlants, setEditPlant }) => {
  const onEdit = (e) => {
    const id = e.target.className;
    setEditPlant(true);
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
  }

  return (
    <div className={'tile'}>
      <h4>{plant.name}</h4>
      <span>Species: {plant.species}</span>
      <span>Sunlight: {plant.sunlight}</span>
      <span>Water Frequency: {plant.waterFreq}</span>
      <span>Maintenance: {plant.maintenance}</span>
      <div className = "tileButtons">
        <button onClick={onEdit} className={plant.id}>edit</button>
        <button onClick={onDelete} className={plant.id}>delete</button>
      </div>
    </div>
  );
};

export default PlantTile;