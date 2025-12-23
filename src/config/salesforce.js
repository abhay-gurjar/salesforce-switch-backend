const jsforce = require("jsforce");

let conn = null;

const setConnection = (instanceUrl, accessToken) => {
  conn = new jsforce.Connection({
    instanceUrl,
    accessToken,
  });
};

const clearConnection = () => {
  conn = null;
};

const getConnection = () => conn;

module.exports = { setConnection, clearConnection, getConnection };
