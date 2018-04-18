const LIMIT_NUMBER_INDEX = 5;

const limit = args => {
  return new Promise((resolve, reject) => {
    if (!Number(args[LIMIT_NUMBER_INDEX])) {
      reject('LIMIT parameter should be a number and its required');
    }

    resolve(args[LIMIT_NUMBER_INDEX]);
  });
}

module.exports = limit;