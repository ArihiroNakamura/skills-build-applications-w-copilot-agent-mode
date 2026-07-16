import { useEffect, useState } from 'react';

const buildApiUrl = (path) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
};

function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(buildApiUrl('/api/teams/'));
      const data = await response.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else if (data && Array.isArray(data.results)) {
        setItems(data.results);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Teams</h2>
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
