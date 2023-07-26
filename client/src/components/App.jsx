import React, { useState } from 'react';
import PlantList from './PlantList.jsx';
import AddPlant from './AddPlant.jsx';

const App = () => {
  const [newPlant, setNewPlant] = useState(false);

  const addPlant = () => {
    console.log('adding plant');
    setNewPlant(true);
  };


  return (
    <>
      <title>Plant Talk</title>
      <PlantList />
    </>
  );
};

export default App;