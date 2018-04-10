const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  founder: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  series: {
    type: String,
    required: true
  }
});

module.exports = carsSchema;