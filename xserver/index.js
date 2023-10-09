const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes.js')
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', router);

console.log(process.env.PORT)
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));