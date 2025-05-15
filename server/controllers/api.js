const User = require('../models/user');

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error('Error in getAllUsers:', err); // helpful log
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
module.exports = {
    getAllUsers
};