import { useEffect, useState } from 'react';
import { buildApiUrl, parseApiResponse } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/teams/'));
        if (!response.ok) {
          throw new Error('Unable to load teams.');
        }
        const data = await response.json();
        setItems(parseApiResponse(data));
      } catch (_err) {
        setError('Unable to load teams.');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-muted">No teams available yet.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={`${item.id || item.name || index}`} className="list-group-item">
              <strong>{item.name || item.team || 'Team'}</strong>
              {item.description ? <div className="text-muted small">{item.description}</div> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
