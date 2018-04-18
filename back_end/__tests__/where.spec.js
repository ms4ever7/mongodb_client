const where = require('../api/helpers/where');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Where', () => {
  it('Failed to get condition parameters when using where function', () => {
    const errorMessage = 'Condition is required when using WHERE';

    const result = where([ 'SELECT', '*', 'FROM', 'cars', 'WHERE' ]);

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Success get optional parameters when using where function', () => {
    const expectedResult = { name: { '$eq': 'Audi' } };

    const result = where([ 'SELECT', '*', 'FROM', 'cars', 'WHERE', 'name', '=', 'Audi' ]);

    return result.then(data => expect(data).to.deep.equal(expectedResult));
  })
})