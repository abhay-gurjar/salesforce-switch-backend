const jsforce = require("jsforce");

const getConnection = (req) => {
  if (!req.session || !req.session.sfAuth) {
    return null;
  }

  const { instanceUrl, accessToken } = req.session.sfAuth;

  return new jsforce.Connection({
    instanceUrl,
    accessToken,
  });
};

module.exports = { getConnection };
