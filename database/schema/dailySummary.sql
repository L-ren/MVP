CREATE TABLE IF NOT EXISTS summary (
  id INT NOT NULL, -- PLANT ID
  date DATE, -- date of summary data
  maxTemp INT,
  minTemp INT, -- OPTIONAL?
  maxSunlight INT,
  sunlightDuration TIME, -- OPTIONAL?
  lastWatered DATE,
  PRIMARY KEY (id)
);