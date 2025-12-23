const express = require("express");
const {
  login,
  callback,
  me,
  getValidationRules,
  deployChanges,
  logout,
} = require("../controllers/salesforceController");

const router = express.Router();

router.get("/login", login);
router.get("/oauth/callback", callback);
router.get("/me", me);
router.get("/validation-rules", getValidationRules);
router.post("/deploy", deployChanges);
router.get("/logout", logout);

module.exports = router;
