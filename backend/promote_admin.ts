import mongoose from 'mongoose';
import User from './src/models/User';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/shopgrid';

async function promoteToAdmin(email: string) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`User ${email} promoted to admin successfully.`);
      console.log(user);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (err) {
    console.error('Error promoting user:', err);
  } finally {
    await mongoose.disconnect();
  }
}

const email = 'amansuhag6014@gmail.com';
promoteToAdmin(email);
