import React from 'react';
import PlantTile from './PlantTile.jsx';

const PlantList = ({ myPlants, setMyPlants, setEditPlant }) => {
  if (Array.isArray(myPlants)) {
    return (
      <div className="listContainer">
      <h3>My plants</h3>
      <div className="plantList">
        {myPlants.map(plant => <PlantTile plant={plant} key={plant.id} myPlants={myPlants} setMyPlants={setMyPlants} setEditPlant={setEditPlant} />)}
      </div>
      </div>
    );
  }
  return;
};

export default PlantList;