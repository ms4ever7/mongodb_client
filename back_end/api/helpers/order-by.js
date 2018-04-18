const COLUMNS_INDEX = 5;
const ASC_INDEX = 1;
const DESC_INDEX = -1;

const order = args => {
  return new Promise((resolve, reject) => {
    if (!args[COLUMNS_INDEX]) {
      reject('Column parameter is requierd when using ORDER BY');
    }

    const optionalArgs = args.splice(COLUMNS_INDEX).join(' ');
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
          reject('If you are using order by function for each argument with sorting, then is should look like: country DESC');
        }

      } else {
        reject('If you are using order by function, there should be 1 or 2 arguments for each filter');
      }
    })
  
    resolve(appropriateArgs);
  });
}

module.exports = order;