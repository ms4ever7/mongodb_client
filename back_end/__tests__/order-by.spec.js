const orderBy = require('../api/helpers/order-by');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

describe('Order By', () => {
  it('Failed to get optional parameters when using order by function without arguments', () => {
    const errorMessage = 'Column parameter is requierd when using ORDER BY';

    try {
      orderBy(['SELECT', '*', 'FROM', 'cars', 'ORDER_BY' ]);      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }
  });

  it('Failed to get optional parameters when using order by function with wrong arguments length', () => {
    const errorMessage = 'If you are using order by function, there should be 1 or 2 arguments for each filter';

    try {
      orderBy(['SELECT', '*', 'FROM', 'cars', 'ORDER_BY', 'name', 'country', 'desc' ]);      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }
  });

  it('Failed to get optional parameters when using order by function with wrong sorting arguments', () => {
    const errorMessage = 'If you are using order by function for each argument with sorting, then is should look like: country DESC';

    try {
      orderBy(['SELECT', '*', 'FROM', 'cars', 'ORDER_BY', 'name', 'test, country' ]);      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);
    }
  });

  it('Success get optional parameters when using order by function', () => {
    const expectedResult = { name: 1, year: -1 }

    const result = orderBy([ 'SELECT', '*', 'FROM', 'cars', 'ORDER_BY', 'name', 'ASC,year', 'DESC' ]);

    return expect(result).to.deep.equal(expectedResult);
  });
});
