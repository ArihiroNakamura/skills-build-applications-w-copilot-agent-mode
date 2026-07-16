import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const activitySchema = new Schema({
  name: { type: String, required: true },
  type: String,
  description: String,
});

const leaderboardEntrySchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  title: String,
  duration: Number,
});

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = model('Workout', workoutSchema);

export const connectDatabase = async () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString);
  return mongoose.connection;
};
