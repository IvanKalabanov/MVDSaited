// src/components/Admin/RoleManagement.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RoleProtected from '../Layout/RoleProtected';
import './RoleManagement.css';

const RoleManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, name: 'Иванов А.С.', login: 'ivanov', role: 'admin', department: 'Штаб', lastActive: '2024-01-15' },
    { id: 2, name: 'Петрова М.К.', login: 'petrova', role: 'leader', department: 'ОУР', lastActive: '2024-01-15' },
    { id: 3, name: 'Сидоров В.П.', login: 'sidorov', role: 'employee', department: 'ОУР', lastActive: '2024-01-14' },
    { id: 4, name: 'Козлов Д.И.', login: 'kozlov', role: 'employee', department: 'ППСП', lastActive: '2024-01-14' },
    { id: 5, name: 'Николаев С.М.', login: 'nikolaev', role: 'employee', department: 'ППСП', lastActive: '2024-01-13' },
    { id: 6, name: 'Гражданин А.Б.', login: 'user123', role: 'user', department: '-', lastActive: '2024-01-12' }
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const roles = [
    { value: 'user', label: 'Гражданин', description: 'Может подавать заявления и просматривать новости' },
    { value: 'employee', label: 'Сотрудник', description: 'Доступ к базе данных и просмотр сотрудников' },
    { value: 'leader', label: 'Руководитель', description: 'Управление сотрудниками и добавление руководителей' },
    { value: 'admin', label: 'Администратор', description: 'Полный доступ ко всем функциям системы' }
  ];


  const getRoleBadge = (role) => {
    const roleConfig = {
      user: { class: 'role-user', label: 'Гражданин' },
      employee: { class: 'role-employee', label: 'Сотрудник' },
      leader: { class: 'role-leader', label: 'Руководитель' },
      admin: { class: 'role-admin', label: 'Администратор' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return <span className={`role-badge ${config.class}`}>{config.label}</span>;
  };

  const cannotEdit = (targetUser) => {
    return targetUser.id === user.id || targetUser.role === 'admin';
  };

  return (
    <RoleProtected requiredRole="admin">
      <div className="role-management">
        <div className="page-header">
          <div>
            <h1>Управление ролями пользователей</h1>
            <p>Настройка прав доступа для сотрудников и граждан</p>
          </div>
        </div>

        <div className="roles-info">
          <h3>Уровни доступа:</h3>
          <div className="roles-grid">
            {roles.map(role => (
              <div key={role.value} className="role-info-card">
                <div className="role-header">
                  {getRoleBadge(role.value)}
                </div>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="users-table-container">
          <div className="table-header">
            <h3>Пользователи системы</h3>
            <div className="table-stats">
              Всего: {users.length} пользователей
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <div className="loading">Загрузка пользователей...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ФИО</th>
                    <th>Логин</th>
                    <th>Подразделение</th>
                    <th>Текущая роль</th>
                    <th>Последняя активность</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(userItem => (
                  <tr key={userItem.id}>
                    <td className="user-name">
                      <div className="name-avatar">
                        <div className="avatar-circle">
                          {userItem.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {userItem.name}
                        {userItem.id === user.id && (
                          <span className="current-user-badge">Вы</span>
                        )}
                      </div>
                    </td>
                    <td>{userItem.login}</td>
                    <td>{userItem.department}</td>
                    <td>{getRoleBadge(userItem.role)}</td>
                    <td>{userItem.last_active || userItem.lastActive || 'Никогда'}</td>
                    <td>
                      <div className="user-actions">
                        {cannotEdit(userItem) ? (
                          <span className="no-edit">Недоступно</span>
                        ) : (
                          <>
                            <button
                              className="btn btn-small btn-primary"
                              onClick={() => setEditingUser(userItem)}
                            >
                              Изменить роль
                            </button>
                            {userItem.id !== user.id && (
                              <button
                                className="btn btn-small btn-danger"
                                onClick={() => handleDeleteUser(userItem.id)}
                              >
                                Удалить
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {editingUser && (
          <div className="modal-overlay" onClick={() => setEditingUser(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setEditingUser(null)}>×</button>
              
              <h2>Изменение роли пользователя</h2>
              
              <div className="user-info">
                <div className="user-avatar-large">
                  {editingUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3>{editingUser.name}</h3>
                  <p>Логин: {editingUser.login}</p>
                  <p>Текущая роль: {getRoleBadge(editingUser.role)}</p>
                </div>
              </div>

              <div className="role-selection">
                <h4>Выберите новую роль:</h4>
                <div className="role-options">
                  {roles.map(role => (
                    <label key={role.value} className="role-option">
                      <input
                        type="radio"
                        name="newRole"
                        value={role.value}
                        checked={editingUser.role === role.value}
                        onChange={() => updateUser(editingUser.id, role.value)}
                      />
                      <div className="role-option-content">
                        <span className="role-option-label">{role.label}</span>
                        <span className="role-option-desc">{role.description}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleProtected>
  );
};

export default RoleManagement;