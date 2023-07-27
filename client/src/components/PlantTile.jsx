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
      {plant.species}
      {plant.sunlight}
      {plant.waterFreq}
      {plant.maintenance}
      <button onClick={onEdit} className={plant.id}>edit</button>
      <button onClick={onDelete} className={plant.id}>delete</button>
    </div>
  );
};

export default PlantTile;