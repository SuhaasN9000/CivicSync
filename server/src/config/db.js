const mongoose = require('mongoose');

const connectDB = async (uri = process.env.MONGO_URI) => {
  if (!uri) {
    throw new Error('MONGO_URI is not set. Add your MongoDB connection string to server/.env');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  return mongoose.connection;
};

module.exports = connectDB;
