// src/components/Leadership/LeaderCard.jsx
import React from 'react';
import './LeaderCard.css';

const LeaderCard = ({ leader, onDelete, canDelete }) => {
  return (
    <div className="leader-card card">
      {canDelete && onDelete && (
        <button 
          className="leader-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Удалить руководителя"
        >
          ×
        </button>
      )}
      <div className="leader-image">
        <img 
          src={leader.photo || leader.image || 'https://via.placeholder.com/200/200?text=Leader'} 
          alt={leader.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200/200?text=Leader';
          }}
        />
        <div className="leader-badge">{leader.department}</div>
      </div>
      
      <div className="leader-info">
        <h3 className="leader-name">{leader.full_name || leader.name}</h3>
        <p className="leader-position">{leader.position}</p>
        <p className="leader-bio">{leader.bio || 'Информация отсутствует'}</p>
      </div>
    </div>
  );
};

export default LeaderCard;