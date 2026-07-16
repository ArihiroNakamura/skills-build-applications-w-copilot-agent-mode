"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const createApiResponse = (items) => ({ results: items });
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/activities/', async (_req, res) => {
    await (0, database_1.connectDatabase)();
    const activities = await models_1.Activity.find({}).lean();
    res.json(createApiResponse(activities));
});
app.get('/api/leaderboard/', async (_req, res) => {
    await (0, database_1.connectDatabase)();
    const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
    res.json(createApiResponse(leaderboard));
});
app.get('/api/teams/', async (_req, res) => {
    await (0, database_1.connectDatabase)();
    const teams = await models_1.Team.find({}).lean();
    res.json(createApiResponse(teams));
});
app.get('/api/users/', async (_req, res) => {
    await (0, database_1.connectDatabase)();
    const users = await models_1.User.find({}).lean();
    res.json(createApiResponse(users));
});
app.get('/api/workouts/', async (_req, res) => {
    await (0, database_1.connectDatabase)();
    const workouts = await models_1.Workout.find({}).lean();
    res.json(createApiResponse(workouts));
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
