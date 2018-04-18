const dbManager = require('../api/services/db-manager');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('DB-manager', () => {
  it('Failed to get data from mongodb by using sql query', () => {
    const errorMessage = 'No results found';

    const result = dbManager('SELECT test FROM cars');

    return expect(result).to.be.rejectedWith(errorMessage);
  });

  it('Success after trying to get data from mongo db using sql query', () => {
    const result = dbManager('SELECT name FROM cars');

    return result.then(data => {
      expect(data[0]).to.have.property('name');
      expect(data[0]).to.not.have.property('country');
    });
  });
})