const express = require('express');

const users = require('../utils/userMap');
const { getAllUsers } = require('../controllers/api');

const router = express.Router();

router.get('/allusers', getAllUsers);

router.get('/connected-users', (req, res) => {
    const userList = Array.from(users.entries()).map(([userId, socketId]) => ({
        userId,
        socketId
    }));
    res.json(userList);
    console.log(userList);
});

module.exports = router;
