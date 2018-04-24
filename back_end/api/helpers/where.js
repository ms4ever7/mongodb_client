const SqlWhereParser = require('sql-where-parser');

const { OPTIONAL_CONDITION_INDEX } = require('../constants');
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
  let appropriateResult = {};

  if (parsedDataKey === 'AND' || parsedDataKey === 'OR') {
    const appropriateOperator = OPERATORS.get(parsedDataKey);

    appropriateResult[appropriateOperator] = data[parsedDataKey].map(obj => parse(obj));
    return appropriateResult;
  } else {
    const conditionData = Object.entries(data)[0];
    const operator = conditionData[0];
    const field = conditionData[1][0];
    const value = conditionData[1][1];

    appropriateResult[field] = { [OPERATORS.get(operator)]: value };

    return appropriateResult;
  }
}

const parseWhereConditionToMongo = args => {
  if (!args[OPTIONAL_CONDITION_INDEX]) {
    throw 'Condition is required when using WHERE';
  }

  const optionalArgs = args.splice(OPTIONAL_CONDITION_INDEX).join(' ');

  const parser = new SqlWhereParser();
  const parsedData = parser.parse(optionalArgs);

  const appropriateResult = parse(parsedData);

  return appropriateResult;
}

module.exports = parseWhereConditionToMongo;