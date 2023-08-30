CREATE TABLE IF NOT EXISTS plants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(45),
  waterFreq VARCHAR(25),
  sunlight VARCHAR(25),
  hardiness INT,
  PRIMARY KEY (id)
);
