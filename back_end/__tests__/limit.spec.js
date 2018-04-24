const limit = require('../api/helpers/limit');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

describe('Limit', () => {
  it('Failed to get optional parameters when using limit function', () => {
    const errorMessage = 'LIMIT parameter should be a number and its required';

    try {
      limit([ 'SELECT', '*', 'FROM', 'cars', 'LIMIT' ]);
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }
  });

  it('Success get optional parameters when using limit function', () => {
    const expectedResult = '10';

    const result = limit([ 'SELECT', '*', 'FROM', 'cars', 'LIMIT', '10' ]);

    return expect(result).to.equal(expectedResult);
  })
})