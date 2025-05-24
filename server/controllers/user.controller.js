const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { getUser, setUser,deleteUser } = require('../service/auth.service');
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
        res.cookie('uid', sessionId),{
            httpOnly: true,
        };
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message:"Wrong credentials"});
    }
    user.isOnline = true;
    user.lastSeen = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    await user.save();
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId, {
        httpOnly: true,
        secure: false,
        sameSite:'lax'
    });

    return res.send('user login done');
}

async function handleUserLogout(req,res) {
    const sessionId = req.cookies.uid;
    if (sessionId) {
        const user=getUser(sessionId)
        if(user && user._id) {
            try{
                await User.findByIdAndUpdate(user._id,{
                    isOnline:false,
                    lastSeen: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            })
            console.log('logout process')
            } catch(err) {
                console.log(err);
            } finally{
                console.log('user last seen updated',user)
            }
        } else {
            console.log('no user')
        }
        deleteUser(sessionId);
        res.clearCookie('uid',{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        console.log('cookie cleared')
    } else {
        console.log('no session id')
    }
    res.send('user logged out');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};