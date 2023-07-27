import React from 'react';

const PlantTile = ({ plant }) => {
  const onEdit = (e) => {
    console.log('editing!');
  }
  const onDelete = (e) => {
    console.log('deleting!');
  }

  console.log(plant);
  return (
    <div className='tile'>
      <h4>{plant.name}</h4>
      {plant.species}
      current conditions
      status update
      {/* <button onClick={onEdit}>edit</button>
      <button onClick={onDelete}>delete</button> */}
    </div>
  );
};

export default PlantTile;