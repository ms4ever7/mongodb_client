const mongoose = require('mongoose');
const { db } = require('../config');

const carsSchema = require('../schemas/cars');
const connection = mongoose.connect(`mongodb://${db.host}/${db.name}`);

mongoose.Promise = global.Promise;

module.exports = mongoose.model('Cars', carsSchema);
