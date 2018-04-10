const sqlToMongo = require('../helpers/sql-to-mongo');

const LIMIT_NUMBER_INDEX = 5;

const limit = args => {
  return new Promise((resolve, reject) => {
    if (!args[LIMIT_NUMBER_INDEX]) {
      reject('Number for limit parameter is requierd when using LIMIT');
    }

    if (!Number(args[LIMIT_NUMBER_INDEX])) {
      reject('LIMIT parameter should be a number');
    }

    resolve(args[LIMIT_NUMBER_INDEX]);
  });
}

module.exports = limit;