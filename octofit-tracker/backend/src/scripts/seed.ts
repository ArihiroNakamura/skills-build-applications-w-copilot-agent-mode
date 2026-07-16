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
      { name: 'Ari Nakamura', username: 'ari', email: 'ari@example.com' },
      { name: 'Jules Martin', username: 'jules', email: 'jules@example.com' },
      { name: 'Mina Chen', username: 'mina', email: 'mina@example.com' },
    ]);

    await Team.create([
      { name: 'Blue Team', description: 'Fast-paced training squad focused on endurance' },
      { name: 'Green Team', description: 'Balanced strength and mobility group' },
      { name: 'Red Team', description: 'Competitive interval training crew' },
    ]);

    await Activity.create([
      { name: 'Morning Run', type: 'run', description: '5k jog through the park' },
      { name: 'Strength Training', type: 'strength', description: 'Upper body and core session' },
      { name: 'Yoga Flow', type: 'mobility', description: 'Recovery and flexibility routine' },
    ]);

    await LeaderboardEntry.create([
      { name: 'Ari Nakamura', score: 95 },
      { name: 'Jules Martin', score: 88 },
      { name: 'Mina Chen', score: 91 },
    ]);

    await Workout.create([
      { name: 'HIIT', title: 'High intensity interval training', duration: 25 },
      { name: 'Yoga Flow', title: 'Mobility and breathing', duration: 30 },
      { name: 'Power Circuit', title: 'Strength and cardio combination', duration: 40 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
