import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { buildApiUrl } from './utils/api';

function App() {
  const apiPreview = buildApiUrl('/api/health');

  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="display-5">OctoFit Tracker</h1>
          <p className="text-muted">Track activities, teams, users, workouts, and leaderboard progress.</p>
          <p className="text-muted small mb-0">
            API target: <code>{apiPreview}</code>
          </p>
          <p className="text-muted small">
            Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces; otherwise the app falls back to localhost.
          </p>
          <nav className="nav nav-pills gap-2 mt-3">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
              Workouts
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
