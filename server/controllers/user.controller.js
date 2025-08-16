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
        res.cookie('uid', sessionId,{
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    try{
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
            secure: true,
            sameSite:'none'
        });
        return res.status(200).json({
            message: "User login done",
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName,
                fullName: user.fullName
            }
        });

    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleUserLogout(req,res) {
    try{
        const sessionId = req.cookies.uid;
        if (sessionId) {
            const user=getUser(sessionId)
            if(user && user._id) {
                try{
                    await User.findByIdAndUpdate(user._id,{
                        isOnline:false,
                        lastSeen: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                })
                } catch (err) {}
            }
            deleteUser(sessionId);
            res.clearCookie('uid',{
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
        }
        res.send('user logged out');
    } catch(err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};