const express = require('express');
const axios = require('axios');
const controller = require('../database/controller.js');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get request received')
  res.sendStatus(200);
});

router.post('/', (req, res) => {
  console.log(req.body);
  axios.get(`https://perenual.com/api/species-list?page=1&key=sk-nEde64bf2def48cd51665&q=${req.body.species}`)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
  // controller.createProfile();
  res.sendStatus(201);
})

router.put('/', (req, res) => {
  console.log('put request received');
  res.sendStatus(200);
})

module.exports = router;