
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { OK, UNPROCESSABLE_ENTITY } = require('http-status-codes');

const Cars = require('../models/cars');
const { cars } = require('../cars.json');

const dbManager = require('../services/db-manager');

router.get('/', async (req, res) => {
  // temporary creating model until it won't be working with docker at start of application
  // await Cars.create(cars);
  try {
    const { sqlQuery } = req.query;
    const cars = await dbManager(sqlQuery);

    res.status(OK).json(cars);
  } catch (err) { 
    res.status(UNPROCESSABLE_ENTITY).send(err || err.message);
  }
});

module.exports = router;