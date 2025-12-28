const express = require("express");
const {
  login,
  callback,
  getValidationRules,
  deployChanges,
  logout,
} = require("../controllers/salesforceController");

const router = express.Router();

router.get("/login", login);
router.get("/oauth/callback", callback);
router.get("/validation-rules", getValidationRules);
router.post("/deploy", deployChanges);
router.get("/logout", logout);
router.post("/logout", logout);

module.exports = router;
