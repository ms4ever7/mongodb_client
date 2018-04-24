const { OPTIONAL_CONDITION_INDEX } = require('../constants');

const skipConditionToMongo = (args) => {
  if (!Number(args[OPTIONAL_CONDITION_INDEX])) {
    throw 'Skip parameter should be a number and its required';
  }

  return args[OPTIONAL_CONDITION_INDEX];
}

module.exports = skipConditionToMongo;