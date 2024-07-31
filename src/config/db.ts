import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDBUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
