import { useEffect, useState } from 'react';
import { buildApiUrl, parseApiResponse } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(buildApiUrl('/api/leaderboard/'));
      const data = await response.json();
      setItems(parseApiResponse(data));
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Leaderboard</h2>
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
