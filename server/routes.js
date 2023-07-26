const express = require('express');
const controller = require('../database/controller.js');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get request received')
  res.sendStatus(200);
});

router.post('/', (req, res) => {
  console.log('post request received');
  res.status(201).send(req.body);
})

router.put('/', (req, res) => {
  console.log('put request received');
  res.sendStatus(200);
})

module.exports = router;