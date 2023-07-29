import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';
import EditPlant from './EditPlant.jsx';

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
    <div className="main">
      <div className="columnLeft">
        <h2>Plant Talk</h2>
        <button onClick={addPlant} className="addButton">Add plant!</button>
      </div>
      <PlantList myPlants={myPlants} setMyPlants={setMyPlants} setEditPlant={setEditPlant}/>
      {newPlant && <AddPlant setNewPlant={setNewPlant} />}
      {editPlant && <EditPlant setEditPlant={setEditPlant} />}
    </div>
  );
};

export default App;