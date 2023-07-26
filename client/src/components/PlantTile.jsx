import React from 'react';

const PlantTile = () => {
  const onEdit = (e) => {
    console.log('editing!');
  }
  const onDelete = (e) => {
    console.log('deleting!');
  }
  console.log(`test`);

  return (
    <div className='tile'>
      Name
      Species
      Age
      current conditions
      status update
      <button onClick={onEdit}>edit</button>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default PlantTile;