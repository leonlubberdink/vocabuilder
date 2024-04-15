const express = require("express");

const googleSheetsController = require("../controllers/googleSheetsController");

const router = express.Router();

router.route("/getTabs").get(googleSheetsController.getTabs);
router.route("/getAllWords").post(googleSheetsController.getAllWords);

module.exports = router;
