CREATE TABLE IF NOT EXISTS plants (
  id INT NOT NULL AUTO_INCREMENT,
  perenualId INT,
  ownerId INT,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(45),
  waterFreq VARCHAR(25),
  sunlight VARCHAR(25),
  hardiness INT,
  type VARCHAR(15), -- MAY NEED TO AJUST THIS
  waterPeriod VARCHAR(10), -- MAY NEED TO AJUST THIS
  waterDepth VARCHAR(10), -- MAY NEED TO AJUST THIS
  maintenance VARCHAR(10), -- MAY NEED TO AJUST THIS
  image VARCHAR(120), -- MAY NEED TO AJUST THIS
  PRIMARY KEY(id),
  FOREIGN KEY(hardiness)
    REFERENCES hardiness(id),
  FOREIGN KEY(ownerId)
    REFERENCES users(id),
  INDEX ownerIndex USING BTREE (ownerId)
);
