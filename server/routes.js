const express = require('express');
const axios = require('axios');
const controller = require('../database/controller.js');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get request received')
  res.sendStatus(200);
});

router.post('/', async (req, res) => {
  const name = req.body.name;
  const species = req.body.species;

  const plantInfo = await axios.get(`https://perenual.com/api/species-list?page=1&key=sk-nEde64bf2def48cd51665&q=${species}`)

  const plantId = plantInfo.data.data[0].id;
  const sunlight = plantInfo.data.data[0].sunlight;
  const waterFreq = plantInfo.data.data[0].watering;

  const morePlantInfo = await axios.get(`https://perenual.com/api/species/details/${[plantId]}?key=sk-nEde64bf2def48cd51665`)

  const type = morePlantInfo.data.type;
  const hardiness = morePlantInfo.data.hardiness;
  const waterPeriod = morePlantInfo.data.watering_period;
  const waterDepth = morePlantInfo.data.depth_water_requirement;
  const maintenance = morePlantInfo.data.maintenance;

  console.log(sunlight, waterFreq, type, hardiness, waterPeriod, waterDepth, maintenance);
  // create plant profile, pass in
  // controller.createProfile();
  res.sendStatus(201);
})

router.put('/', (req, res) => {
  console.log('put request received');
  res.sendStatus(200);
})

module.exports = router;