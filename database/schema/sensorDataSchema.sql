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