const limit = require('../api/helpers/limit');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Limit', () => {
  it('Failed to get optional parameters when using limit function', () => {
    const errorMessage = 'LIMIT parameter should be a number and its required';

    const result = limit([ 'SELECT', '*', 'FROM', 'cars', 'LIMIT' ]);

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Success get optional parameters when using limit function', () => {
    const expectedResult = '10';

    const result = limit([ 'SELECT', '*', 'FROM', 'cars', 'LIMIT', '10' ]);

    return result.then(data => expect(data).to.equal(expectedResult));
  })
})