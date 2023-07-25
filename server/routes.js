const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get request received')
  res.sendStatus(200);
});

router.post('/', (req, res) => {
  console.log('post request received');
  res.sendStatus(201);
})

router.put('/', (req, res) => {
  console.log('put request received');
  res.sendStatus(200);
})

module.exports = router;