const db = require('./index.js');
const model = require('./model.js'); // creates tables if not already in db

module.exports.getPlants = () => {
  console.log(`received`);
  return db.query(`SELECT * FROM plants`)
};

module.exports.createProfile = (plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) => {
  let values = [plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance];

  return db.query(`INSERT INTO plants (perenualId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) VALUES (?)`, [values])
};