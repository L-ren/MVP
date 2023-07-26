import React from 'react';
import PlantTile from './PlantTile.jsx';

const PlantList = () => {
  return (
    <div>
      <h3>My plants</h3>
      <PlantTile />
      <PlantTile />
    </div>
  );
};

export default PlantList;