const sqlToMongo = require('../api/helpers/sql-to-mongo');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('SqlToMongo', () => {
  it('Failed parse sql query to mongo because of wrong first argument', () => {
    const errorMessage = 'First argument should be SELECT command';

    const result = sqlToMongo('test first arg');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Failed parse sql query to mongo because of empty projection argument', () => {
    const errorMessage = 'Projection argument is required';

    const result = sqlToMongo('SELECT');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Failed parse sql query to mongo because of wrong third argument', () => {
    const errorMessage = 'Third argument is required and it should be FROM command';

    const result = sqlToMongo('SELECT * test');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Failed parse sql query to mongo because of empty collection argument', () => {
    const errorMessage = 'Collection argument is required';

    const result = sqlToMongo('SELECT * FROM');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Faled to parse sql query to mongo because of wrong optional parameter', () => {
    const errorMessage = 'Options parameter should be one of those: WHERE, ORDER BY, SKIP, LIMIT';

    const result = sqlToMongo('SELECT * FROM cars test');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Success parsed sql query to mongo with optional arguments', () => {
    const expectedResult = { 
      sort: {},
      condition: {},
      limit: 0,
      skip: 10,
      projections: [],
      collectionName: 'cars' 
    };

    const result = sqlToMongo('SELECT * FROM cars SKIP 10');

    return result.then(data => expect(data).to.deep.equal(expectedResult));
  })
})