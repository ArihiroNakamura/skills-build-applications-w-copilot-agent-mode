"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        await models_1.User.create([
            { name: 'Ari Nakamura', username: 'ari', email: 'ari@example.com' },
            { name: 'Jules Martin', username: 'jules', email: 'jules@example.com' },
            { name: 'Mina Chen', username: 'mina', email: 'mina@example.com' },
        ]);
        await models_1.Team.create([
            { name: 'Blue Team', description: 'Fast-paced training squad focused on endurance' },
            { name: 'Green Team', description: 'Balanced strength and mobility group' },
            { name: 'Red Team', description: 'Competitive interval training crew' },
        ]);
        await models_1.Activity.create([
            { name: 'Morning Run', type: 'run', description: '5k jog through the park' },
            { name: 'Strength Training', type: 'strength', description: 'Upper body and core session' },
            { name: 'Yoga Flow', type: 'mobility', description: 'Recovery and flexibility routine' },
        ]);
        await models_1.LeaderboardEntry.create([
            { name: 'Ari Nakamura', score: 95 },
            { name: 'Jules Martin', score: 88 },
            { name: 'Mina Chen', score: 91 },
        ]);
        await models_1.Workout.create([
            { name: 'HIIT', title: 'High intensity interval training', duration: 25 },
            { name: 'Yoga Flow', title: 'Mobility and breathing', duration: 30 },
            { name: 'Power Circuit', title: 'Strength and cardio combination', duration: 40 },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
