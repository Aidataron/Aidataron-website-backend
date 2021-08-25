const express = require("express");
const messageController = require("../controllers/message-controllers");

const router = express.Router();

router.post("/", messageController.addMessage);

module.exports = router;
