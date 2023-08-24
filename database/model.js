const mysql = require('mysql2/promise')
const db = require('./index.js');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(path.join(__dirname, './schema/userSchema.sql')).toString();
// const hardinessSchema = fs.readFileSync(path.join(__dirname, './schema/hardinessSchema.sql')).toString();
const plantSchema = fs.readFileSync(path.join(__dirname, './schema/plantSchema.sql')).toString();
const sensorDataSchema = fs.readFileSync(path.join(__dirname, './schema/sensorDataSchema.sql')).toString();


// MAKE THIS DRYER

const createTables = async () => {
  db.query(userSchema).catch(err => console.log(err));
  // db.query(hardinessSchema).catch(err => console.log(err));
  db.query(plantSchema).catch(err => console.log(err));
  db.query(sensorDataSchema).catch(err => console.log(err));
  return true;
}

module.exports = createTables();