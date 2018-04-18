const skip = require('../api/helpers/skip');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Skip', () => {
  it('Failed to get optional parameters when using skip function', () => {
    const errorMessage = 'Skip parameter should be a number and its required';

    const result = skip([ 'SELECT', '*', 'FROM', 'cars', 'SKIP' ]);

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Success get optional parameters when using skip function', () => {
    const expectedResult = '10';

    const result = skip([ 'SELECT', '*', 'FROM', 'cars', 'SKIP', '10' ]);

    return result.then(data => expect(data).to.equal(expectedResult));
  })
})