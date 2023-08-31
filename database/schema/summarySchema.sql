CREATE TABLE IF NOT EXISTS summary (
  id INT NOT NULL AUTO_INCREMENT,
  plantId INT NOT NULL,
  date DATE, -- date of summary data
  maxTemp INT,
  minTemp INT, -- OPTIONAL?
  maxSunlight INT,
  sunlightDuration TIME, -- OPTIONAL?
  lastWatered DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (plantId)
    REFERENCES plants(id)
);


-- select MAX, MIN temp + MAX sun for each plantId row within DATE

-- SELECT plantId, MAX(temp) AS maxTemp
-- FROM sensorData
-- WHERE time
-- GROUP BY plantId


