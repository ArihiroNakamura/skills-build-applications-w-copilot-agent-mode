import { useEffect, useState } from 'react';
import { buildApiUrl, parseApiResponse } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(buildApiUrl('/api/workouts/'));
      const data = await response.json();
      setItems(parseApiResponse(data));
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Workouts</h2>
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
