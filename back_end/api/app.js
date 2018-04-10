const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 8000;

const app = express();

const cars = require('./routes/cars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/cars', cars);

app.listen(port, () => console.log(`Server started on port ${port}...`));