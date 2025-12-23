const axios = require("axios");
const { getConnection } = require("../config/salesforce");

const login = (req, res) => {
  const url =
    "https://login.salesforce.com/services/oauth2/authorize" +
    "?response_type=code" +
    "&client_id=" + process.env.CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(process.env.REDIRECT_URI);

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

  req.session.sfAuth = {
    accessToken: tokenRes.data.access_token,
    instanceUrl: tokenRes.data.instance_url,
  };

  req.session.save(() => {
    res.redirect(`${process.env.FRONTEND_URL}/switch`);
  });
};

const me = (req, res) => {
  if (req.session && req.session.sfAuth) {
    return res.json({ authenticated: true });
  }
  return res.status(401).json({ authenticated: false });
};

const getValidationRules = async (req, res) => {
  const conn = getConnection(req);
  if (!conn) return res.status(401).json({ error: "Not authenticated" });

  const result = await conn.tooling.query(`
    SELECT ValidationName, Active
    FROM ValidationRule
    WHERE EntityDefinition.QualifiedApiName = 'Account'
  `);

  res.json(result.records);
};

const deployChanges = async (req, res) => {
  const conn = getConnection(req);
  if (!conn) return res.status(401).json({ error: "Not authenticated" });

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
  req.session.destroy(() => {
    res.clearCookie("sf-switch-session");
    res.json({ success: true });
  });
};

module.exports = {
  login,
  callback,
  me,
  getValidationRules,
  deployChanges,
  logout,
};
