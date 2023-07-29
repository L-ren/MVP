import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

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


  return ReactDOM.createPortal((
    <div className="modalBackground">
      <div className="addPlant">
        <button className="xButton" onClick={() => setNewPlant(false)}>X</button>
        <form onSubmit={onSubmitClick}>
        <h3>Congrats!</h3>
          Name:
          <input type="text" onChange={(e)=>setName(e.target.value)}></input>
          Species:
          <input type="text" onChange={(e)=>setSpecies(e.target.value)} required></input>
          <button type="submit" className="submitButton">Submit</button>
        </form>
      </div>
    </div>
  ), document.getElementById("portal"));
};

export default AddPlant;