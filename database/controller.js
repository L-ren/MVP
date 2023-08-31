const db = require('./index.js');
const model = require('./model.js'); // creates tables if not already in db
const dayjs = require('dayjs');

module.exports.getPlants = () => {
  // get most recent plant sensor data

  // query YESTERDAY's DATA
  //  let startDate = dayjs().add(-1, 'day').startOf('date').format();
  //  let endDate = dayjs().add(-1, 'day').endOf('date').format();

  let startDate = dayjs().startOf('date').format();
  let endDate = dayjs().endOf('date').format();


  return db.query(`
    SELECT *
    FROM (
      SELECT *
      FROM (
        SELECT sensorData.plantId, temp, humidity, light, moisture, latestTime
        FROM sensorData
        INNER JOIN (
          SELECT plantId, MAX(time) AS latestTime
          FROM sensorData GROUP BY plantId
        ) latestIdTime
        ON sensorData.plantId=latestIdTime.plantId
        AND sensorData.time=latestIdTime.latestTime
      ) AS latestData
      INNER JOIN plants
      ON latestData.plantId=plants.id
    ) AS currentData
    INNER JOIN (
      SELECT plantId, MAX(temp) AS maxTemp, MIN(temp) AS minTemp, MAX(light) as maxSunlight
      FROM sensorData
      WHERE time BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY plantId
    ) yesterdaysData
    ON currentData.plantId=yesterdaysData.plantId
    ORDER BY plants.name ASC;;
    `
  );


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
    ON latestData.plantId=plants.id
    ORDER BY plants.name ASC;`);
};

module.exports.createProfile = (name, species, waterFreq, sunlight) => {
  let values = [name, species, waterFreq, sunlight];
  let date = dayjs().format(); //.format()??
  // let date = new Date();
  return db.query(`INSERT INTO plants (name, species, waterFreq, sunlight) VALUES (?); INSERT INTO sensorData (plantId, time) VALUES (LAST_INSERT_ID(), '${date}');`, [values])
};

module.exports.editProfile = (id, name) => {
  console.log(id);
  return db.query(`UPDATE plants SET name='${name}' WHERE id=${id}`);
};

module.exports.deleteProfile = (id) => {
  return db.query(`DELETE FROM plants WHERE id=${id}; DELETE FROM sensorData WHERE plantId=${id}`)
};

module.exports.saveSensorData = ({id, temp, humidity, light, moisture}) => {
  const rawDate = new Date();
  const date = dayjs().format(); //.format()??

  /* CREATE PREVIOUS DAY SUMMARY ENTRY:
    query sensor data for entries from previous day:
      - max + min temp
      - max sunlight
        - duration?
      - min/max/average? water level

      - if current water level > yesterday's, set to today
      - if not, keep at last watered date (if NA, default null)
  */

  return db.query(`INSERT INTO sensorData (plantId, time, temp, humidity, light, moisture) VALUES (?)`, [[id, date, temp, humidity, light, moisture]]);
}