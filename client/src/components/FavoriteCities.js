import React from 'react';
import './FavoriteCities.css';
import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

const FavoriteCities = ({ favorites, onRemoveFavorite, onFavoriteClick }) => {
  return (
    <div className="favorite-cities-card">
      <h3>⭐ Favorite Cities</h3>
      {favorites.length === 0 ? (
        <p className="empty-message">No favorite cities yet. Add some to get quick access!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <div
                className="favorite-info"
                onClick={() => onFavoriteClick(favorite.city)}
              >
                <FaMapMarkerAlt className="location-icon" />
                <div className="favorite-details">
                  <span className="favorite-city">{favorite.city}</span>
                  {favorite.country && (
                    <span className="favorite-country">{favorite.country}</span>
                  )}
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => onRemoveFavorite(favorite.id)}
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCities;

