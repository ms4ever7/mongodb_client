const sqlToMongo = require('../helpers/sql-to-mongo');

const NUMBER_TO_SKIP_INDEX = 5;

const skip = args => {
  return new Promise((resolve, reject) => {
    if (!args[NUMBER_TO_SKIP_INDEX]) {
      reject('Number to skip parameter is requierd when using SKIP');
    }

    if (!Number(args[NUMBER_TO_SKIP_INDEX])) {
      reject('Skip parameter should be a number');
    }

    resolve(args[NUMBER_TO_SKIP_INDEX]);
  });
}

module.exports = skip;