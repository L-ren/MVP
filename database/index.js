const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'myplants'
});

module.exports = pool;