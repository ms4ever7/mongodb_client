const SqlWhereParser = require('sql-where-parser');

const CONDITIONS_INDEX = 5;
const OPERATORS = new Map([
  ['=', '$eq'],
  ['>', '$gt'],
  ['>=', '$gte'],
  ['<>', '$ne'],
  ['<', '$lt'],
  ['<=', '$lte'],
  ['AND', '$and'],
  ['OR', '$or']
]);


const parse = (data) => {
  const parsedDataKey = Object.keys(data)[0];
  if (parsedDataKey === 'AND' || parsedDataKey === 'OR') {
    const appropriateResult = {};
    const appropriateOperator = OPERATORS.get(parsedDataKey);

    appropriateResult[appropriateOperator] = data[parsedDataKey].map(obj => parse(obj));
    return appropriateResult;
  } else {
    const appropriateResult = {};
    const conditionData = Object.entries(data)[0];
    const operator = conditionData[0];
    const field = conditionData[1][0];
    const value = conditionData[1][1];

    appropriateResult[field] = { [OPERATORS.get(operator)]: value };

    return appropriateResult;
  }
}

const where = args => {
  return new Promise((resolve, reject) => {
    if (!args[CONDITIONS_INDEX]) {
      reject('Condition is required when using WHERE');
    }

    const optionalArgs = args.splice(CONDITIONS_INDEX).join(' ');

    const parser = new SqlWhereParser();
    const parsedData = parser.parse(optionalArgs);

    const appropriateResult = parse(parsedData);

    resolve(appropriateResult);
  });
}

module.exports = where;