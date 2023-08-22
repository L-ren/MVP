const express = require('express');
const axios = require('axios');
const controller = require('../database/controller.js');
const router = express.Router();

router.get('/plants', (req, res) => {
  controller.getPlants()
  .then(data => {
    console.log(data[0])
    res.status(200).send(data[0])
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.post('/plants', async (req, res) => {
  const name = req.body.name;
  const species = req.body.species;

  // get basic plant info from API
  const plantInfo = await axios.get(`https://perenual.com/api/species-list?page=1&key=sk-nEde64bf2def48cd51665&q=${species}`)

  // RACKING UP SOME TECH DEBT HERE
  const plantId = plantInfo.data.data[0].id;
  const sunlight = Array.isArray(plantInfo.data.data[0].sunlight) ? plantInfo.data.data[0].sunlight[0]: plantInfo.data.data[0].sunlight;
  const waterFreq = plantInfo.data.data[0].watering;

  // get more info from API
  const morePlantInfo = await axios.get(`https://perenual.com/api/species/details/${[plantId]}?key=sk-nEde64bf2def48cd51665`)

  const type = undefined; //morePlantInfo.data.type;
  const hardiness = morePlantInfo.data.hardiness.min;
  const waterPeriod = morePlantInfo.data.watering_period;
  const waterDepth = morePlantInfo.data.depth_water_requirement.value ? `${morePlantInfo.data.depth_water_requirement.value} ${morePlantInfo.data.depth_water_requirement.unit}` : `0 inches`;
  const maintenance = morePlantInfo.data.maintenance;

  // write new plant info to db
  controller.createProfile(plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance)
  .then(() => res.sendStatus(201))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });

})

router.post('/plantupdate', (req, res) => {
  controller.saveSensorData(req.body);
  res.status(201).send('received');
})

router.put('/plants', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const species = req.body.species;

  // get basic plant info from API
  const plantInfo = await axios.get(`https://perenual.com/api/species-list?page=1&key=sk-nEde64bf2def48cd51665&q=${species}`)

  // RACKING UP SOME TECH DEBT HERE
  const plantId = plantInfo.data.data[0].id;
  const sunlight = Array.isArray(plantInfo.data.data[0].sunlight) ? plantInfo.data.data[0].sunlight[0]: plantInfo.data.data[0].sunlight;
  const waterFreq = plantInfo.data.data[0].watering;

  // get more info from API
  const morePlantInfo = await axios.get(`https://perenual.com/api/species/details/${[plantId]}?key=sk-nEde64bf2def48cd51665`)

  const type = undefined; //morePlantInfo.data.type;
  const hardiness = morePlantInfo.data.hardiness.min;
  const waterPeriod = morePlantInfo.data.watering_period;
  const waterDepth = morePlantInfo.data.depth_water_requirement.value ? `${morePlantInfo.data.depth_water_requirement.value} ${morePlantInfo.data.depth_water_requirement.unit}` : `0 inches`;
  const maintenance = morePlantInfo.data.maintenance;

  controller.editProfile(id, plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance)
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });

})

router.delete('/plants/:id', (req, res) => {
  controller.deleteProfile(req.params.id);
  res.sendStatus(200);
})

module.exports = router;