const jsforce = require("jsforce");

const getConnection = (req) => {
  if (!req.session || !req.session.sfAuth) return null;

  return new jsforce.Connection({
    instanceUrl: req.session.sfAuth.instanceUrl,
    accessToken: req.session.sfAuth.accessToken,
  });
};

module.exports = { getConnection };
