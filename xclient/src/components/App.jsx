import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';
import EditPlant from './EditPlant.jsx';
import AddPlantManual from './AddPlantManual.jsx';

const App = () => {
  // if newPlant submission fails to get plant info from API, pass user inputted { name, species } to newPlantManual modal for user to manually fill in care info
  const [newPlantManual, setNewPlantManual] = useState({});
  const [newPlant, setNewPlant] = useState(false);
  const [editPlant, setEditPlant] = useState(0);
  const [myPlants, setMyPlants] = useState([]);

  const [edit, setEdit] = useState(true);

  const addPlant = (e) => {
    setNewPlant(true);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/plants')
    .then(function (response) {
      setMyPlants(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/plants')
    .then(function (response) {
      console.log(response.data);
      setMyPlants(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [newPlant, editPlant, newPlantManual]);


  return (
    <div className="main">
      <div className="columnLeft">
        {/* <h2>Plant Talk</h2> */}
        {edit && <button onClick={addPlant} className="addButton">Add plant!</button>}
      </div>
      <PlantList myPlants={myPlants} setMyPlants={setMyPlants} setEditPlant={setEditPlant} edit={edit}/>
      {newPlant && <AddPlant setNewPlant={setNewPlant} setNewPlantManual={setNewPlantManual} />}
      {newPlantManual.name && <AddPlantManual newPlantManual={newPlantManual} setNewPlantManual={setNewPlantManual} />}
      {editPlant && <EditPlant editPlant={editPlant} setEditPlant={setEditPlant} />}
    </div>
  );
};

export default App;