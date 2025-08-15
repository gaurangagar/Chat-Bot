const mongoose = require('mongoose');

const uri=process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {}
};

module.exports = connectDB;