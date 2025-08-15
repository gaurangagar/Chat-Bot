const User = require('../models/user');
const {getUser}=require('../service/auth.service')

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function getCurrentUser(req, res) {
  const sessionId = req.cookies?.uid;
  if (!sessionId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const user = getUser(sessionId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid session' });
  }
  return res.json({
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    isOnline: user.isOnline,
    lastSeen: user.lastSeen,

  });
}

module.exports = {
    getAllUsers,
    getCurrentUser
};