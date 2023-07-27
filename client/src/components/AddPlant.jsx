import React, { useState } from 'react';
import axios from 'axios';

const AddPlant = ({ setNewPlant }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const onSubmitClick = (e) => {
    e.preventDefault();
   // post request to API
    axios.post('http://localhost:3000/plants', {
      name,
      species
    })
    .then(function (response) {
      console.log(response);
      setNewPlant(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div className="addPlant">
      <h3>Congrats!</h3>
      <form onSubmit={onSubmitClick}>
        Name:
        <input type="text" onChange={(e)=>setName(e.target.value)}></input>
        Species:
        <input type="text" onChange={(e)=>setSpecies(e.target.value)} required></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default AddPlant;