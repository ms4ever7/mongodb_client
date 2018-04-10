const { MongoClient } = require('mongodb');

const sqlToMongo = require('../helpers/sql-to-mongo');
const url = 'mongodb://localhost/mongodb_client';

module.exports = sqlQuery => {
  return new Promise(async (resolve, reject) => {
    try {
      const parsedSQL = await sqlToMongo(sqlQuery);
      const { projections, collectionName, limit, sort, skip, condition } = parsedSQL;
      const projectionsObject = {};

      projections.forEach(projection => projectionsObject[projection] = 1);
      projectionsObject._id = 0;
      projectionsObject.__v = 0;

      const db = await MongoClient.connect(url);

      db.collection(collectionName)
        .find(condition, projectionsObject)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .toArray((err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);        
        })
    } catch (err) {
      reject(err);
    }
  });
}