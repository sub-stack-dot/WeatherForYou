import React, { useEffect, useState } from "react";
import "./SearchHistory.css";

function SearchHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/weather/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load history");
        }
        setHistory(data);
      } catch (err) {
        setError(err.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [API_URL]);

  return (
    <div className="history-container">
      <h2 className="history-title">Search History</h2>
      {loading && <p className="history-status">Loading...</p>}
      {error && <p className="history-error">{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p className="history-status">No search history yet.</p>
      )}

      <div className="history-grid">
        {history.map((item) => (
          <div className="history-card" key={item._id}>
            <h3>{item.city}</h3>
            <p>Temperature: {item.temperature}°C</p>
            <p>Condition: {item.condition}</p>
            <p className="history-date">
              {new Date(item.searchDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
