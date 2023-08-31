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



