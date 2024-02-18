const azure = require("azure-storage");

const tableSvc = azure.createTableService(
  "restapinode",
  process.env.AZURE_STORAGE_ACCESS_KEY
);

const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(
      tableName,
      entity,
      { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        }
        resolve(response.body);
      }
    );
  });
};

const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(
      tableName,
      query,
      { payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        }
        resolve(response.body);
      }
    );
  });
};

exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
