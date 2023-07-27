import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const EditPlant = ({ id, setEditPlant }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const onSubmitClick = (e) => {
    e.preventDefault();
    // post request to API
    axios.put('http://localhost:3000/plants', {
      id
    })
    .then(function (response) {
      console.log(response);
      setEditPlant(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return ReactDOM.createPortal((
    <div className="modalBackground">
      <div className="editPlant">
        <button className="xButton" onClick={() => setEditPlant(false)}>X</button>
        <h3>Congrats!</h3>
        <form onSubmit={onSubmitClick}>
          Name:
          <input type="text" onChange={(e)=>setName(e.target.value)}></input>
          Species:
          <input type="text" onChange={(e)=>setSpecies(e.target.value)} required></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ), document.getElementById("portal"));
};

export default EditPlant;