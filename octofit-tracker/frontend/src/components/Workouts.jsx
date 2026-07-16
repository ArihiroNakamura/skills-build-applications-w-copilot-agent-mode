import { useEffect, useState } from 'react';
import { buildApiUrl, parseApiResponse } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/workouts/'));
        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }
        const data = await response.json();
        setItems(parseApiResponse(data));
      } catch (_err) {
        setError('Unable to load workouts.');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-muted">No workouts available yet.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={`${item.id || item.name || index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.name || item.title || 'Workout'}</span>
              {item.duration ? <span className="badge bg-info text-dark">{item.duration} min</span> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
