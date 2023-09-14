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
    let plantData = plantInfo.data.data[0];
    if ((plantData === undefined) || (plantData.watering.includes('Upgrade Plans'))) {
      res.status(502).send({ name, species });
      return;
    }

    // const plantId = plantInfo.data.data[0].id;
    sunlight = Array.isArray(plantInfo.data.data[0].sunlight) ? plantInfo.data.data[0].sunlight[0]: plantInfo.data.data[0].sunlight;
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
  controller.saveSensorData(req.body)
  .then(() => {
    res.status(201).send('received');
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })

})

router.put('/plants', async (req, res) => {
  /* UPDATE: PUT only updates plant name, not its species */
  const id = req.body.id;
  const name = req.body.name;

  controller.editProfile(id, name)
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