const where = require('../api/helpers/where');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

describe('Where', () => {
  it('Failed to get condition parameters when using where function', () => {
    const errorMessage = 'Condition is required when using WHERE';

    try {
      where([ 'SELECT', '*', 'FROM', 'cars', 'WHERE' ]);      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }

  });

  it('Success get optional parameters when using where function', () => {
    const expectedResult = { name: { '$eq': 'Audi' } };

    const result = where([ 'SELECT', '*', 'FROM', 'cars', 'WHERE', 'name', '=', 'Audi' ]);

    return expect(result).to.deep.equal(expectedResult);
  })
})