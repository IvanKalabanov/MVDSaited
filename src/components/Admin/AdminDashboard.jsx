// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUsers, updateUserRole, deleteUser, getStats } from '../../utils/api';
import RoleManagement from './RoleManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: '📊 Панель управления', icon: '📊' },
    { id: 'users', label: '👥 Управление пользователями', icon: '👥' },
    { id: 'database', label: '🗃️ Управление БД', icon: '🗃️' },
    { id: 'content', label: '📝 Управление контентом', icon: '📝' },
    { id: 'settings', label: '⚙️ Настройки', icon: '⚙️' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Панель администратора</h1>
          <p>Полное управление системой МВД Enter Project</p>
        </div>
        <div className="admin-user-info">
          <div className="admin-avatar">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="admin-name">{user.name}</div>
            <div className="admin-role">Администратор</div>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h2>Общая статистика</h2>
            {loading ? (
              <div className="loading">Загрузка статистики...</div>
            ) : stats ? (
              <div className="stats-grid-admin">
                <div className="stat-card-admin">
                  <div className="stat-icon-admin">👮</div>
                  <div className="stat-info-admin">
                    <div className="stat-value-admin">{stats.employees || 0}</div>
                    <div className="stat-label-admin">Сотрудников</div>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin">📝</div>
                  <div className="stat-info-admin">
                    <div className="stat-value-admin">{stats.applications || 0}</div>
                    <div className="stat-label-admin">Заявлений за месяц</div>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin">🔄</div>
                  <div className="stat-info-admin">
                    <div className="stat-value-admin">{stats.inProgress || 0}</div>
                    <div className="stat-label-admin">В работе</div>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin">🗃️</div>
                  <div className="stat-info-admin">
                    <div className="stat-value-admin">{stats.database || 0}</div>
                    <div className="stat-label-admin">Записей в БД</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="error-message">Ошибка загрузки статистики</div>
            )}
          </div>
        )}

        {activeTab === 'users' && <RoleManagement />}
        
        {activeTab === 'database' && (
          <div className="database-management-tab">
            <h2>Управление базой данных</h2>
            <p>Здесь можно управлять всеми записями в базе данных нарушителей.</p>
            <p className="info-text">Перейдите в раздел "База данных" для полного управления записями.</p>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="content-management-tab">
            <h2>Управление контентом</h2>
            <div className="content-actions">
              <div className="content-action-card">
                <h3>Новости</h3>
                <p>Управление новостями системы</p>
                <a href="/news" className="btn btn-primary">Перейти к новостям</a>
              </div>
              <div className="content-action-card">
                <h3>Руководство</h3>
                <p>Управление списком руководителей</p>
                <a href="/leadership" className="btn btn-primary">Перейти к руководству</a>
              </div>
              <div className="content-action-card">
                <h3>Сотрудники</h3>
                <p>Управление штатным расписанием</p>
                <a href="/employees" className="btn btn-primary">Перейти к сотрудникам</a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>Настройки системы</h2>
            <div className="settings-section">
              <h3>Общие настройки</h3>
              <div className="setting-item">
                <label>Название организации</label>
                <input type="text" className="form-input" defaultValue="МВД Enter Project" />
              </div>
              <div className="setting-item">
                <label>Описание системы</label>
                <textarea className="form-textarea" defaultValue="Игровая правоохранительная организация" />
              </div>
            </div>
            <div className="settings-section">
              <h3>Безопасность</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Требовать сложные пароли
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Логировать действия пользователей
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">Сохранить настройки</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

