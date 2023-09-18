CREATE TABLE IF NOT EXISTS sensorData (
  id INT NOT NULL AUTO_INCREMENT,
  plantId INT NOT NULL,
  time DATETIME NOT NULL,
  temp INT,
  humidity INT,
  light INT,
  moisture INT,
  PRIMARY KEY (id)
);


/*






  SELECT plantId, moisture, time
  FROM (
    SELECT *
    FROM sensorData
    WHERE plantId=${id}
  ) plantData
  WHERE time > (
    SELECT time
    FROM sensorData AS data1
    WHERE plantId=${id}
    AND EXISTS (
      SELECT *
      FROM sensorData AS data2
      WHERE data2.plantId = data1.plantId
      AND data2.time > data1.time
      AND data2.moisture > data1.moisture
    )
    ORDER BY
      time DESC
    LIMIT 1;
    )
  ORDER BY time DESC
  LIMIT 1;







  SELECT plantId, moisture, time
    FROM sensorData AS data1
    WHERE plantId=${id}
    AND EXISTS (
      SELECT *
      FROM sensorData AS data2
      WHERE data2.plantId = data1.plantId
      AND data2.time > data1.time
      AND data2.moisture > data1.moisture
    )
    ORDER BY
      time DESC
    LIMIT 1;



 */