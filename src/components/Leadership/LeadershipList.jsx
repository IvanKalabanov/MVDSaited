// src/components/Leadership/LeadershipList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLeaders, createLeader, deleteLeader } from '../../utils/api';
import LeaderCard from './LeaderCard';
import AddLeaderForm from './AddLeaderForm';
import './LeadershipList.css';

const LeadershipList = () => {
  const { hasRole } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    try {
      setLoading(true);
      const data = await getLeaders();
      setLeaders(data);
    } catch (error) {
      console.error('Ошибка загрузки руководителей:', error);
      alert('Ошибка загрузки руководителей. Убедитесь, что сервер запущен.');
    } finally {
      setLoading(false);
    }
  };

  const addLeader = async (newLeader) => {
    try {
      const created = await createLeader(newLeader);
      setLeaders(prev => [...prev, created]);
      setShowAddForm(false);
      alert('Руководитель успешно добавлен!');
    } catch (error) {
      console.error('Ошибка добавления руководителя:', error);
      alert('Ошибка добавления руководителя');
    }
  };

  const handleDeleteLeader = async (leaderId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого руководителя?')) return;
    
    try {
      await deleteLeader(leaderId);
      setLeaders(prev => prev.filter(l => l.id !== leaderId));
      alert('Руководитель успешно удален!');
    } catch (error) {
      console.error('Ошибка удаления руководителя:', error);
      alert('Ошибка удаления руководителя');
    }
  };

  return (
    <div className="leadership-list">
      <div className="page-header">
        <h1>Руководство МВД</h1>
        <p>Структура управления организации</p>
        
        {(hasRole('leader') || hasRole('admin')) && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Добавить руководителя
          </button>
        )}
      </div>

      {showAddForm && (
        <AddLeaderForm 
          onAdd={addLeader}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {loading ? (
        <div className="loading">Загрузка руководителей...</div>
      ) : leaders.length === 0 ? (
        <div className="no-leaders">
          <div className="no-leaders-icon">👔</div>
          <h3>Руководителей пока нет</h3>
          <p>Добавьте первого руководителя</p>
        </div>
      ) : (
        <div className="leaders-grid">
          {leaders.map(leader => (
            <LeaderCard 
              key={leader.id} 
              leader={leader}
              onDelete={hasRole('admin') ? () => handleDeleteLeader(leader.id) : null}
              canDelete={hasRole('admin')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadershipList;