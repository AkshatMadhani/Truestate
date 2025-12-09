import mongoose from 'mongoose';

const dbcon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log('Database connected successfully');
    console.log(`Connected to: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default dbcon;