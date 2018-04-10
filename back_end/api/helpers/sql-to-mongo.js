const where = require('./where');
const orderBy = require('./order-by');
const skip = require('./skip');
const limit = require('./limit');

const SELECT_INDEX = 0;
const PROJECTIONS_INDEX = 1;
const FROM_INDEX = 2;
const COLLECTION_INDEX = 3;

const OPTIONAL_ARGUMENT_INDEX = 4;

const handleQuery = query => {
  // cover tabs, newlines, etc
  const appropriateQuery = query.replace(/\s\s+/g, ' ');

  // create and regular expression where there is 'order by' command,
  // so it'll be easier to handle it on back end
  const orderArgumentPresent = new RegExp('\\b'+'order'+'\\b').test(appropriateQuery.toLowerCase())
  const orderRegex = /\b(order )\b/gi;

  return orderArgumentPresent ? appropriateQuery.toLowerCase().replace(orderRegex, 'order_') : appropriateQuery;
}

const parse = sqlQuery => {
  return new Promise(async (resolve, reject) => {
    const appropriateQuery = handleQuery(sqlQuery); 

    const sqlArguments = appropriateQuery.split(' ');
    const appropriateResult = { 
      sort: {},
      condition: {},
      limit: 0,
      skip: 0
     };

    if (sqlArguments[SELECT_INDEX].toLowerCase() !== 'select') {
      return reject('First argument should be SELECT command');
    }

    if (!sqlArguments[PROJECTIONS_INDEX]) {
      return reject('Projection argument is required');
    }

    // add projections array for the result, and remove * argument if there is so
    appropriateResult.projections = sqlArguments[PROJECTIONS_INDEX]
      .split(',')
      .filter(arg => arg !== '*');

    if (!sqlArguments[FROM_INDEX] || sqlArguments[FROM_INDEX].toLowerCase() !== 'from') {
      return reject('Third argument is required and it should be FROM command');
    }

    if (!sqlArguments[COLLECTION_INDEX]) {
      return reject('Collection argument is required');
    }

    // add collection name to the result
    appropriateResult.collectionName = sqlArguments[COLLECTION_INDEX];

    // add functionallity to handle optional parameters
    const optionsArg = sqlArguments[OPTIONAL_ARGUMENT_INDEX];

    if (!optionsArg) {
      return resolve(appropriateResult);
    }

    switch (optionsArg.toLowerCase()) {
      case 'where':
        try {
          const whereFilter = await where(sqlArguments);

          appropriateResult.condition = whereFilter;
          resolve(appropriateResult);
        } catch(err) {
          reject(err); 
        }
        break;
      case 'order_by':
        try {
          const orderFilter = await orderBy(sqlArguments);

          appropriateResult.sort = orderFilter;
          resolve(appropriateResult);
        } catch(err) {
          reject(err); 
        }
        break;
      case 'skip':
        try {
          const skipFilter = await skip(sqlArguments);

          appropriateResult.skip = Number(skipFilter);
          resolve(appropriateResult);
        } catch(err) {
          reject(err);
        }
        break;
      case 'limit':
        try {
          const limitFilter = await limit(sqlArguments);

          appropriateResult.limit = Number(limitFilter);
          resolve(appropriateResult);
        } catch(err) {
          reject(err);
        }
        break;
      default:
        reject('Options parameter should be one of those: WHERE, ORDER BY, SKIP, LIMIT');
    }
  })
}

module.exports = parse;