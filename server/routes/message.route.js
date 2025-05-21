const express = require('express');

const { getMessages,createMessage } = require('../controllers/messages.controller')

const router = express.Router();

router.post('/getMessages',getMessages)

router.post('/createmessage',createMessage)

module.exports = router;
