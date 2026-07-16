import { useEffect, useState } from 'react';

const buildApiUrl = (path) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
};

function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(buildApiUrl('/api/users/'));
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
      <h2 className="h4 mb-3">Users</h2>
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
