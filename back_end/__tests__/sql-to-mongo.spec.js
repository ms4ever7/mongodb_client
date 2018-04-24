const sqlToMongo = require('../api/helpers/sql-to-mongo');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

describe('SqlToMongo', () => {
  it('Failed parse sql query to mongo because of wrong first argument', () => {
    const errorMessage = 'First argument should be SELECT command';

    try {
      sqlToMongo('test first arg');      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);      
    }
  });

  it('Failed parse sql query to mongo because of empty projection argument', () => {
    const errorMessage = 'Projection argument is required';

    try {
      sqlToMongo('SELECT');      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);      
    }
  });

  it('Failed parse sql query to mongo because of wrong third argument', () => {
    const errorMessage = 'Third argument is required and it should be FROM command';

    try {
      sqlToMongo('SELECT * test');      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);      
    }
  });

  it('Failed parse sql query to mongo because of empty collection argument', () => {
    const errorMessage = 'Collection argument is required';

    try {
      sqlToMongo('SELECT * FROM');      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);      
    }
  });

  it('Faled to parse sql query to mongo because of wrong optional parameter', () => {
    const errorMessage = 'Options parameter should be one of those: WHERE, ORDER BY, SKIP, LIMIT';

    try {
      sqlToMongo('SELECT * FROM cars test');      
    } catch (error) {
      return expect(error).to.be.equal(errorMessage);      
    }
  });

  it('Success parsed sql query to mongo with optional arguments', () => {
    const expectedResult = { 
      sort: {},
      condition: {},
      limit: 0,
      skip: "10",
      projections: [],
      collectionName: 'cars' 
    };

    const result = sqlToMongo('SELECT * FROM cars SKIP 10');

    return expect(result).to.deep.equal(expectedResult);
  })
})