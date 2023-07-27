import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';

const App = () => {
  const [newPlant, setNewPlant] = useState(false);
  const [editPlant, setEditPlant] = useState(false);
  const [myPlants, setMyPlants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/plants')
    .then(function (response) {
      setMyPlants(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const addPlant = (e) => {
    setNewPlant(true);
  };
  // DRY this out later
  useEffect(() => {
    axios.get('http://localhost:3000/plants')
    .then(function (response) {
      setMyPlants(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [newPlant]);


  return (
    <>
      <h2>Plant Talk</h2>
      <PlantList myPlants={myPlants} setMyPlants={setMyPlants}/>
      <button onClick={addPlant}>Add plant!</button>
      {newPlant && <AddPlant setNewPlant={setNewPlant} />}
    </>
  );
};

export default App;