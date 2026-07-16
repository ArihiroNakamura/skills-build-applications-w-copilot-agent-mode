import { useEffect, useState } from 'react';

const buildApiUrl = (path) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
};

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/activities/'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data && Array.isArray(data.results)) {
          setItems(data.results);
        } else {
          setItems([]);
        }
      } catch (err) {
        setError('Unable to load activities right now.');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-muted">No activities available yet.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={`${item.id || item.name || index}`} className="list-group-item d-flex justify-content-between align-items-start">
              <span>{item.name || item.type || item.description || 'Activity'}</span>
              {item.type ? <span className="badge bg-secondary">{item.type}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
