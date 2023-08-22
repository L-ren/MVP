const db = require('./index.js');
const model = require('./model.js'); // creates tables if not already in db

module.exports.getPlants = () => {
  // return db.query(`SELECT * FROM plants`); // get info on ALL plants, no sensor data
  // get most recent plant sensor data
  // CTE FOR latest data for each sensor from sensorData table
  return db.query(`
    SELECT *
    FROM (
      SELECT sensorData.plantId, temp, humidity, light, moisture, latestTime
      FROM sensorData
      INNER JOIN (
        SELECT plantId, MAX(time)
        AS latestTime
        FROM sensorData GROUP BY plantId
      ) latestIdTime
      ON sensorData.plantId=latestIdTime.plantId
      AND sensorData.time=latestIdTime.latestTime)
    AS latestData
    INNER JOIN plants
    ON latestData.plantId=plants.id;`);
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