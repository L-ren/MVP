const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js')
const app = express();

app.use(morgan('dev'));
app.use('/', router);

app.listen(process.env.PORT || 3000);