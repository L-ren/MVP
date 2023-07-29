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

module.exports.editProfile = (id, plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) => {
  console.log(id);
  return db.query(`UPDATE plants SET perenualId=${plantId}, name='${name}', species='${species}', waterFreq='${waterFreq}', sunlight='${sunlight}', hardiness=${hardiness}, type='${type}', waterPeriod='${waterPeriod}', waterDepth='${waterDepth}', maintenance='${maintenance}' WHERE id=${id}`);
};

module.exports.deleteProfile = (id) => {
  return db.query(`DELETE FROM plants WHERE id=${id}`)
};