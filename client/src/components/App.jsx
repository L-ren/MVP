import React, { useState } from 'react';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';

const App = () => {
  const [newPlant, setNewPlant] = useState(false);

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