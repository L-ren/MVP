const db = require('./index.js');
const model = require('./model.js'); // creates tables if not already in db

module.exports.getProfiles = {};

module.exports.createProfile = (plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) => {
  let values = [plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance];

  return db.query(`INSERT INTO PLANTS (perenualId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) VALUES (?)`, [values])
};