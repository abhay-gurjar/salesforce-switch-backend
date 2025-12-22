const jsforce = require("jsforce");

let connection = null;

const setConnection = (instanceUrl, accessToken) => {
  connection = new jsforce.Connection({
    instanceUrl,
    accessToken,
  });
};

const getConnection = () => connection;

module.exports = { setConnection, getConnection };
