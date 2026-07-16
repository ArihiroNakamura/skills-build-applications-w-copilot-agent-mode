import { useEffect, useState } from 'react';
import { buildApiUrl, parseApiResponse } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/users/'));
        if (!response.ok) {
          throw new Error('Unable to load users.');
        }
        const data = await response.json();
        setItems(parseApiResponse(data));
      } catch (_err) {
        setError('Unable to load users.');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-muted">No users available yet.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={`${item.id || item.name || index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.name || item.username || 'User'}</span>
              {item.username ? <span className="text-muted small">@{item.username}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
