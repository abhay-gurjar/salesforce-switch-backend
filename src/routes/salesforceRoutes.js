const express = require("express");
const router = express.Router();
const controller = require("../controllers/salesforceController");

router.get("/login", controller.login);
router.get("/callback", controller.callback);
router.get("/rules", controller.getValidationRules);
router.post("/deploy", controller.deployChanges);
router.post("/logout", controller.logout);

module.exports = router;
