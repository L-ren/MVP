import React from 'react';
import PlantTile from './PlantTile.jsx';

const PlantList = ({ myPlants, setMyPlants, setEditPlant }) => {
  if (Array.isArray(myPlants)) {
    return (
      <div className="plantList">
        <h3>My plants</h3>
        {myPlants.map(plant => <PlantTile plant={plant} key={plant.id} myPlants={myPlants} setMyPlants={setMyPlants} setEditPlant={setEditPlant} />)}
      </div>
    );
  }
  return;
};

export default PlantList;