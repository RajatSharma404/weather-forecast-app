import React from 'react';
import './SearchHistory.css';
import { FaHistory, FaMapMarkerAlt } from 'react-icons/fa';

const SearchHistory = ({ history, onHistoryClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="search-history-card">
      <h3>
        <FaHistory /> Recent Searches
      </h3>
      {history.length === 0 ? (
        <p className="empty-message">No search history yet. Start searching to see your history!</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div
              key={item.id}
              className="history-item"
              onClick={() => onHistoryClick(item.city)}
            >
              <FaMapMarkerAlt className="location-icon" />
              <div className="history-details">
                <span className="history-city">{item.city}</span>
                {item.country && (
                  <span className="history-country">{item.country}</span>
                )}
              </div>
              <span className="history-time">{formatDate(item.searched_at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;

