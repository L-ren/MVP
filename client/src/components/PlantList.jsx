import React from 'react';
import PlantTile from './PlantTile.jsx';

const PlantList = ({ myPlants }) => {
  console.log(myPlants)
  if (Array.isArray(myPlants)) {
    return (
      <div>
        <h3>My plants</h3>
        {myPlants.map(plant => <PlantTile plant={plant} />)}
      </div>
    );
  }
  return;
};

export default PlantList;