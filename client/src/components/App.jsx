import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';

const App = () => {
  const [newPlant, setNewPlant] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/plants')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const addPlant = (e) => {
    console.log('adding plant');
    setNewPlant(true);
  };


  return (
    <>
      <h2>Plant Talk</h2>
      <PlantList />
      <button onClick={addPlant}>Add plant!</button>
      {newPlant && <AddPlant />}
    </>
  );
};

export default App;