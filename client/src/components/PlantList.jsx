import React from 'react';
import PlantTile from './PlantTile.jsx';

const PlantList = ({ myPlants, setMyPlants, setEditPlant, edit }) => {
  if (Array.isArray(myPlants)) {
    return (
      <div className="listContainer">
      <h3>How are my plants doing?</h3>
      <div className="plantList">
        {myPlants.map(plant => <PlantTile plant={plant} key={plant.id} myPlants={myPlants} setMyPlants={setMyPlants} setEditPlant={setEditPlant} edit={edit} />)}
      </div>
      </div>
    );
  }
  return;
};

export default PlantList;