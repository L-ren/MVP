import React from 'react';

const AddPlant = () => {
  const onSubmitClick = () => {
    console.log('new plant submitted!');
    // post request to API
  }


  return (
    <div className="addPlant">
      <h3>Congrats!</h3>
      <form onSubmit={onSubmitClick}>
        <input type="text">Name</input>
        <input type="text" required>Species</input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default AddPlant;