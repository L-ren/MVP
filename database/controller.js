const db = require('./index.js');
const model = require('./model.js'); // creates tables if not already in db

module.exports.getPlants = () => {
  console.log(`received`);
  // get most recent plant sensor data
  // return db.query(`SELECT * FROM plants`); // get info on ALL plants (inc. those without sensor data)
  return db.query(`SELECT plants.id, name, species, waterFreq, sunlight, hardiness, waterDepth, maintenance, time, temp, humidity, light, moisture FROM plants INNER JOIN sensorData ON plants.id=sensorData.plantId WHERE time=(SELECT MAX(time))`)
};

module.exports.createProfile = (plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) => {
  let values = [plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance];
  let date = new Date();
  return db.query(`INSERT INTO plants (perenualId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) VALUES (?); INSERT INTO sensorData (plantId, time) VALUES (LAST_INSERT_ID(), '${date.toISOString().slice(0, 19).replace('T', ' ')}');`, [values])
};

module.exports.editProfile = (id, plantId, name, species, waterFreq, sunlight, hardiness, type, waterPeriod, waterDepth, maintenance) => {
  console.log(id);
  return db.query(`UPDATE plants SET perenualId=${plantId}, name='${name}', species='${species}', waterFreq='${waterFreq}', sunlight='${sunlight}', hardiness=${hardiness}, type='${type}', waterPeriod='${waterPeriod}', waterDepth='${waterDepth}', maintenance='${maintenance}' WHERE id=${id}`);
};

module.exports.deleteProfile = (id) => {
  return db.query(`DELETE FROM plants WHERE id=${id}`)
};

module.exports.saveSensorData = ({id, temp, humidity, light, moisture}) => {
  const rawDate = new Date();
  const date = rawDate.toISOString().slice(0, 19).replace('T', ' ');
  return db.query(`INSERT INTO sensorData (plantId, time, temp, humidity, light, moisture) VALUES (?)`, [[id, date, temp, humidity, light, moisture]]);
}