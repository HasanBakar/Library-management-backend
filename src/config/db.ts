import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('your_mongo_connection_string');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
