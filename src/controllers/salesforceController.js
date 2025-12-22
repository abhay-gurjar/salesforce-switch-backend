const axios = require("axios");
const { setConnection, getConnection } = require("../config/salesforce");

const login = (req, res) => {
  const url =
    "https://login.salesforce.com/services/oauth2/authorize" +
    "?response_type=code" +
    "&client_id=" + process.env.CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(process.env.REDIRECT_URI) +
    "&prompt=login";

  res.redirect(url);
};

const callback = async (req, res) => {
  const tokenRes = await axios.post(
    "https://login.salesforce.com/services/oauth2/token",
    null,
    {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code,
      },
    }
  );

  setConnection(tokenRes.data.instance_url, tokenRes.data.access_token);

  res.redirect("http://localhost:3000/switch");
};

const getValidationRules = async (req, res) => {
  const conn = getConnection();
  const result = await conn.tooling.query(`
    SELECT ValidationName, Active
    FROM ValidationRule
    WHERE EntityDefinition.QualifiedApiName = 'Account'
  `);
  res.json(result.records);
};

const deployChanges = async (req, res) => {
  const conn = getConnection();
  const rulesState = req.body.rules;

  const metadata = await conn.metadata.read(
    "ValidationRule",
    rulesState.map(r => `Account.${r.name}`)
  );

  const updates = metadata.map(rule => {
    const state = rulesState.find(
      r => r.name === rule.fullName.split(".")[1]
    );
    rule.active = state.active;
    return rule;
  });

  await conn.metadata.upsert("ValidationRule", updates);

  res.json({ success: true });
};

const logout = (req, res) => {
  setConnection(null, null);
  res.redirect("http://localhost:3000/");
};

module.exports = {
  login,
  callback,
  getValidationRules,
  deployChanges,
  logout,
};
