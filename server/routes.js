const express = require('express');
const axios = require('axios');
const controller = require('../database/controller.js');
const router = express.Router();
require('dotenv').config()

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
  let waterFreq = req.body.waterFreq;
  let sunlight = req.body.sunlight;

  if (req.body.sunlight === undefined) {
    // otherwise, request basic plant info from API
    const plantInfo = await axios.get(`https://perenual.com/api/species-list?page=1&key=${process.env.PLANT}&q=${species}`)

    // if care info is NOT provided by free API, return name and species for user to enter care info manually
    let wateringInfo = plantInfo.data.data[0].watering;
    if (wateringInfo.includes('Upgrade Plans')) {
      res.status(502).send({ name, species });
      return;
    }

    // const plantId = plantInfo.data.data[0].id;
    sunlight = Array.isArray(plantInfo.data.data[0].sunlight) ? plantInfo.data.data[0].sunlight[0]: plantInfo.data.data[0].sunlight;
    console.log(sunlight);
    waterFreq = plantInfo.data.data[0].watering;
  }

  // write plant info to database
  controller.createProfile(name, species, waterFreq, sunlight)
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });

  /* NO LONGER RETRIEVES ADD'L INFO FROM API SINCE IT ISN'T FREE */
})

router.post('/plantupdate', (req, res) => {
  controller.saveSensorData(req.body);
  res.status(201).send('received');
})

router.put('/plants', async (req, res) => {
  /* UPDATE: PUT only updates plant name, not its species */
  const id = req.body.id;
  const name = req.body.name;
  // const species = req.body.species;

  controller.editProfile(id, name)
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });

  // // get basic plant info from API
  // const plantInfo = await axios.get(`https://perenual.com/api/species-list?page=1&key=${process.env.PLANT}&q=${species}`)

  // // RACKING UP SOME TECH DEBT HERE
  // const plantId = plantInfo.data.data[0].id;
  // const sunlight = Array.isArray(plantInfo.data.data[0].sunlight) ? plantInfo.data.data[0].sunlight[0]: plantInfo.data.data[0].sunlight;
  // const waterFreq = plantInfo.data.data[0].watering;

  // // get more info from API
  // const morePlantInfo = await axios.get(`https://perenual.com/api/species/details/${[plantId]}?key=${process.env.PLANT}`)

  // const type = undefined; //morePlantInfo.data.type;
  // const hardiness = morePlantInfo.data.hardiness.min;
  // const waterPeriod = morePlantInfo.data.watering_period;
  // const waterDepth = morePlantInfo.data.depth_water_requirement.value ? `${morePlantInfo.data.depth_water_requirement.value} ${morePlantInfo.data.depth_water_requirement.unit}` : `0 inches`;
  // const maintenance = morePlantInfo.data.maintenance;

  // controller.editProfile(id, plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance)
  // .then(() => res.sendStatus(200))
  // .catch(err => {
  //   console.log(err);
  //   res.sendStatus(500);
  // });

})

router.delete('/plants/:id', (req, res) => {
  controller.deleteProfile(req.params.id);
  res.sendStatus(200);
})

module.exports = router;