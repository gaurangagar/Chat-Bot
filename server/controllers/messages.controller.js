const Message = require('../models/messages');

async function getMessages(req, res) {
    const { from, to } = req.body;
    try {
        const messages = await Message.find({
            $or: [
                { from: from, to: to },
                { from: to, to: from },
            ]
        }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

async function createMessage(req, res) {
    const { from, to,message } = req.body;
    try {
        const messagecreated = await Message.create({
            from,
            to,
            message
        });
        console.log(messagecreated)
        res.status(201).json({ success: true, message });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

module.exports = {
    getMessages,
    createMessage
};