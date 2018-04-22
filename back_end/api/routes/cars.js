
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { OK, UNPROCESSABLE_ENTITY } = require('http-status-codes');

const dbManager = require('../services/db-manager');

router.get('/', async (req, res) => {
  try {
    const { sqlQuery } = req.query;
    const cars = await dbManager(sqlQuery);

    res.status(OK).json(cars);
  } catch (err) {
    res.status(UNPROCESSABLE_ENTITY).send(err.message || err);
  }
});

module.exports = router;