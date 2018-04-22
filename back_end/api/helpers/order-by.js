const { OPTIONAL_CONDITION_INDEX } = require('../constants');
const ASC_INDEX = 1;
const DESC_INDEX = -1;

const orderConditionByArguments = (args) => {
  if (!args[OPTIONAL_CONDITION_INDEX]) {
    throw 'Column parameter is requierd when using ORDER BY';
  }

  const optionalArgs = args.splice(OPTIONAL_CONDITION_INDEX).join(' ');
  const argumentsList = optionalArgs.split(',');

  const appropriateArgs = {};

  argumentsList.forEach(arg => {
    const argArray = arg.split(' ');

    if (argArray.length === 1) {
      return appropriateArgs[argArray[0]] = ASC_INDEX;
    } else if (argArray.length === 2) {
      
      //handle column with sorted property
      if (argArray[1].toLowerCase() === 'asc') {
        appropriateArgs[argArray[0]] = ASC_INDEX;
      } else if (argArray[1].toLowerCase() === 'desc') {
        appropriateArgs[argArray[0]] = DESC_INDEX;
      } else {
        throw 'If you are using order by function for each argument with sorting, then is should look like: country DESC';
      }

    } else {
      throw 'If you are using order by function, there should be 1 or 2 arguments for each filter';
    }
  })

  return appropriateArgs;
}

module.exports = orderConditionByArguments;