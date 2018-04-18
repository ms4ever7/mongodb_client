const { MongoClient } = require('mongodb');

const { db } = require('../config');
const url = `mongodb://${db.host}/${db.name}`;

const sqlToMongo = require('../helpers/sql-to-mongo');

module.exports = sqlQuery => {
  return new Promise(async (resolve, reject) => {
    try {
      const parsedSQL = await sqlToMongo(sqlQuery);
      const { projections, collectionName, limit, sort, skip, condition } = parsedSQL;
      const projectionsObject = {};

      projections.forEach(projection => {
        const appropriateProjection = projection.replace('*', '');

        return projectionsObject[appropriateProjection] = 1
      });


      if (!Object.keys(projectionsObject).length) {
        projectionsObject.__v = 0;
      }

      projectionsObject._id = 0;

      const db = await MongoClient.connect(url);

      db.collection(collectionName)
        .find(condition, projectionsObject)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .toArray((err, results) => {
          if (err) {
            return reject(err);
          }

          if (!results.length || !Object.keys(results[0]).length) {
            return reject('No results found');
          }

          return resolve(results);
        })
    } catch (err) {
      reject(err);
    }
  });
}