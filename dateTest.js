const dayjs = require('dayjs'); // commonJS
const db = require('./database/index.js');

let yesterdayStart = dayjs().add(-1, 'day').startOf('date').format();
let yesterdayEnd = dayjs().add(-1, 'day').endOf('date').format();
console.log(yesterdayStart);
console.log(yesterdayEnd);

let todayStart = dayjs().startOf('date').format();
let todayEnd = dayjs().endOf('date').format();
console.log(todayStart);
console.log(todayEnd);

(async function testQuery() {
  // selects max temp for each plant
  const result = await db.query(`
    SELECT plantId, MAX(temp) AS maxTemp, MIN(temp) AS minTemp, MAX(light) as maxSunlight
    FROM sensorData
    WHERE time BETWEEN '${todayStart}' AND '${todayEnd}'
    GROUP BY plantId;
  `);
  console.log(result[0]);
  })();

// select MAX, MIN temp + MAX sun for each plantId row within DATE

// SELECT plantId, MAX(temp) AS maxTemp
// FROM sensorData
// WHERE time
// GROUP BY plantId


