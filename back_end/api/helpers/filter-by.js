const where = require('./where');
const orderBy = require('./order-by');
const skip = require('./skip');
const limit = require('./limit');

const filterOptionalArguments = (optionalArg, sqlArgs) => {
  switch (optionalArg) {
    case 'where':
      try {
        const whereFilter = where(sqlArgs);

        return { condition: whereFilter };
      } catch(err) {
        throw err; 
      }
      break;
    case 'order_by':
      try {
        const orderFilter = orderBy(sqlArgs);

        return { sort: orderFilter };
      } catch(err) {
        throw err; 
      }
      break;
    case 'skip':
      try {
        const skipFilter = skip(sqlArgs);

        return { skip: skipFilter };
      } catch(err) {
        throw err;
      }
      break;
    case 'limit':
      try {
        const limitFilter = limit(sqlArgs);

        return { limit: limitFilter };
      } catch(err) {
        throw err;
      }
      break;
    default:
      throw 'Options parameter should be one of those: WHERE, ORDER BY, SKIP, LIMIT';
  }
}

module.exports = filterOptionalArguments;