const mongoose = require('mongoose');

const uri=process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

module.exports = connectDB;