const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'myplants',
  multipleStatements: true, // vulnerable to SQL injection, make sure inputs are escaped
});

module.exports = pool;