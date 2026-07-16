import mongoose from 'mongoose';
import { User, Team, Activity, LeaderboardEntry, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.create([
      { name: 'Ari', username: 'ari', email: 'ari@example.com' },
      { name: 'Jules', username: 'jules', email: 'jules@example.com' },
    ]);

    await Team.create([
      { name: 'Blue Team', description: 'Fast-paced training squad' },
      { name: 'Green Team', description: 'Steady endurance group' },
    ]);

    await Activity.create([
      { name: 'Morning Run', type: 'run', description: '5k jog' },
      { name: 'Strength Training', type: 'strength', description: 'Upper body' },
    ]);

    await LeaderboardEntry.create([
      { name: 'Ari', score: 95 },
      { name: 'Jules', score: 88 },
    ]);

    await Workout.create([
      { name: 'HIIT', title: 'High intensity interval training', duration: 25 },
      { name: 'Yoga Flow', title: 'Mobility and breathing', duration: 30 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
