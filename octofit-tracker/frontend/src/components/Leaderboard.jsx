import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard entries.');
        }
        const data = await response.json();
        setItems(parseApiResponse(data));
      } catch (_err) {
        setError('Unable to load leaderboard entries.');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-muted">No leaderboard entries yet.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={`${item.id || item.name || index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.name || item.user || item.rank || 'Entry'}</span>
              {item.score != null ? <span className="badge bg-primary">{item.score}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;
