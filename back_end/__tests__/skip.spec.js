const skip = require('../api/helpers/skip');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

describe('Skip', () => {
  it('Failed to get optional parameters when using skip function', () => {
    const errorMessage = 'Skip parameter should be a number and its required';

    try {
      skip([ 'SELECT', '*', 'FROM', 'cars', 'SKIP' ]);
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }
  });

  it('Success get optional parameters when using skip function', () => {
    const expectedResult = '10';

    const result = skip([ 'SELECT', '*', 'FROM', 'cars', 'SKIP', '10' ]);

    return expect(result).to.equal(expectedResult);
  })
})