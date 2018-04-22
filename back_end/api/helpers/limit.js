const { OPTIONAL_CONDITION_INDEX } = require('../constants');

const limitConditionToMongo = (args) => {
  if (!Number(args[OPTIONAL_CONDITION_INDEX])) {
    throw 'LIMIT parameter should be a number and its required';
  }

  return args[OPTIONAL_CONDITION_INDEX];
}

module.exports = limitConditionToMongo;