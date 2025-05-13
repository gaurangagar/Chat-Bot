const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { getUser, setUser } = require('../service/auth.service');
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
    try {
        const { fullName, userName, email, password } = req.body;
        const { firstName, lastName } = fullName || {};
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName: {
                firstName,
                lastName
            },
            userName,
            email,
            salt,
            password: hashedPassword
        });

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);
        return res.send('user created');
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Wrong credentials");
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.send('user login done');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};