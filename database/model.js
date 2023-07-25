const mysql = require('mysql2')
const db = require('./index.js');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(path.join(__dirname, './schema/userSchema.sql')).toString();
const hardinessSchema = fs.readFileSync(path.join(__dirname, './schema/hardinessSchema.sql')).toString();
const plantSchema = fs.readFileSync(path.join(__dirname, './schema/plantSchema.sql')).toString();

// MAKE THIS DRYER

const createTables = async () => {
  db.query(userSchema, (error, results, fields) => {
    if (error) {
      console.log(error);
      return false;
    }
  });
  db.query(hardinessSchema, (error, results, fields) => {
    if (error) {
      console.log(error);
      return false;
    }
  });
  db.query(plantSchema, (error, results, fields) => {
    if (error) {
      console.log(error)
      return false;
    }
  });
  return true;
}

module.exports = createTables();