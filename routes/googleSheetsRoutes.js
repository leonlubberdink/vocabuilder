const express = require("express");

const googleSheetsController = require("../controllers/googleSheetsController");

const router = express.Router();

// router.route("/").get(googleSheetsController.getSheet);

router.route("/getTabs").get(googleSheetsController.getTabs);

module.exports = router;
