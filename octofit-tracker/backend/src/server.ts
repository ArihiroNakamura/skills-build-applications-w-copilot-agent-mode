import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

const createApiResponse = (items: unknown[]) => ({ results: items });

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/activities/', async (_req, res) => {
  await connectDatabase();
  const activities = await Activity.find({}).lean();
  res.json(createApiResponse(activities));
});

app.get('/api/leaderboard/', async (_req, res) => {
  await connectDatabase();
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(createApiResponse(leaderboard));
});

app.get('/api/teams/', async (_req, res) => {
  await connectDatabase();
  const teams = await Team.find({}).lean();
  res.json(createApiResponse(teams));
});

app.get('/api/users/', async (_req, res) => {
  await connectDatabase();
  const users = await User.find({}).lean();
  res.json(createApiResponse(users));
});

app.get('/api/workouts/', async (_req, res) => {
  await connectDatabase();
  const workouts = await Workout.find({}).lean();
  res.json(createApiResponse(workouts));
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
