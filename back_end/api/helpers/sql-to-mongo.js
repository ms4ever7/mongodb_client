const { SELECT_INDEX, PROJECTIONS_INDEX, FROM_INDEX, COLLECTION_INDEX, OPTIONAL_ARGUMENT_INDEX } = require('../constants');
const filterBy = require('./filter-by');

const handleQuery = query => {
  // cover tabs, newlines, etc
  const appropriateQuery = query.replace(/\s\s+/g, ' ');

  // create and regular expression where there is 'order by' command
  const orderArgumentPresent = new RegExp('\\b'+'order'+'\\b').test(appropriateQuery.toLowerCase())
  const orderRegex = /\b(order )\b/gi;

  return orderArgumentPresent ? appropriateQuery.toLowerCase().replace(orderRegex, 'order_') : appropriateQuery;
}

const parse = sqlQuery => {
  const appropriateQuery = handleQuery(sqlQuery); 

  const sqlArguments = appropriateQuery.split(' ');
  const appropriateResult = { 
    sort: {},
    condition: {},
    limit: 0,
    skip: 0
    };

  if (sqlArguments[SELECT_INDEX].toLowerCase() !== 'select') {
    throw 'First argument should be SELECT command';
  }

  if (!sqlArguments[PROJECTIONS_INDEX]) {
    throw 'Projection argument is required';
  }

  // add projections array for the result, and remove * argument if there is so
  appropriateResult.projections = sqlArguments[PROJECTIONS_INDEX]
    .split(',')
    .filter(arg => arg !== '*');

  if (!sqlArguments[FROM_INDEX] || sqlArguments[FROM_INDEX].toLowerCase() !== 'from') {
    throw 'Third argument is required and it should be FROM command';
  }

  if (!sqlArguments[COLLECTION_INDEX]) {
    throw 'Collection argument is required';
  }

  // add collection name to the result
  appropriateResult.collectionName = sqlArguments[COLLECTION_INDEX];

  // add functionallity to handle optional parameters
  const optionsArg = sqlArguments[OPTIONAL_ARGUMENT_INDEX];

  if (!optionsArg) {
    return appropriateResult;
  }

  try {
    const optionalArgument = optionsArg.toLowerCase();
    const result = filterBy(optionalArgument, sqlArguments);
    const optionalKey = Object.keys(result)[0];

    appropriateResult[optionalKey] = result[optionalKey];
    return appropriateResult;
  } catch (err) {
    throw err;
  }
}

module.exports = parse;