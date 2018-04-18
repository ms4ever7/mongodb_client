const NUMBER_TO_SKIP_INDEX = 5;

const skip = args => {
  return new Promise((resolve, reject) => {
    if (!Number(args[NUMBER_TO_SKIP_INDEX])) {
      reject('Skip parameter should be a number and its required');
    }

    resolve(args[NUMBER_TO_SKIP_INDEX]);
  });
}

module.exports = skip;