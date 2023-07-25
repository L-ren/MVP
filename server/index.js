const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes.js')
const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', router);

app.listen(process.env.PORT || 3000);