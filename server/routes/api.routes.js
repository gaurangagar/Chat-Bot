const express = require('express');

const { getAllUsers,getCurrentUser } = require('../controllers/api.controller');

const router = express.Router();

router.get('/allusers', getAllUsers);

router.get('/CurrentUser',getCurrentUser)
module.exports = router;
