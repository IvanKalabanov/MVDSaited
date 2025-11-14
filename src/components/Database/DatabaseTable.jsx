// src/components/Database/DatabaseTable.jsx (обновляем с редактированием)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDatabaseRecords, createDatabaseRecord, updateDatabaseRecord, deleteDatabaseRecord } from '../../utils/api';
import AddRecordForm from './AddRecordForm';
import EditRecordForm from './EditRecordForm';
import './DatabaseTable.css';

const DatabaseTable = () => {
  const { hasRole } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await getDatabaseRecords();
      setRecords(data);
    } catch (error) {
      console.error('Ошибка загрузки записей:', error);
      alert('Ошибка загрузки записей. Убедитесь, что сервер запущен.');
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (newRecord) => {
    try {
      const created = await createDatabaseRecord(newRecord);
      setRecords(prev => [...prev, created]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Ошибка создания записи:', error);
      alert('Ошибка создания записи');
    }
  };

  const updateRecord = async (updatedRecord) => {
    try {
      const updated = await updateDatabaseRecord(updatedRecord.id, updatedRecord);
      setRecords(prev => prev.map(record => 
        record.id === updatedRecord.id ? updated : record
      ));
      setEditingRecord(null);
    } catch (error) {
      console.error('Ошибка обновления записи:', error);
      alert('Ошибка обновления записи');
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту запись?')) return;
    
    try {
      await deleteDatabaseRecord(id);
      setRecords(prev => prev.filter(record => record.id !== id));
    } catch (error) {
      console.error('Ошибка удаления записи:', error);
      alert('Ошибка удаления записи');
    }
  };

  const canEdit = hasRole('leader') || hasRole('admin');

  return (
    <div className="database-page">
      <div className="page-header">
        <div>
          <h1>База данных нарушителей</h1>
          <p>Учёт лиц, привлекавшихся к ответственности</p>
        </div>
        
        {hasRole('employee') && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Добавить запись
          </button>
        )}
      </div>

      <div className="database-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Поиск по ФИО или номеру дела..."
            className="search-input"
          />
        </div>
        <div className="table-actions">
          <select className="filter-select">
            <option value="all">Все типы дел</option>
            <option value="criminal">Уголовные</option>
            <option value="admin">Административные</option>
          </select>
          <select className="filter-select">
            <option value="all">Все статусы</option>
            <option value="investigation">Расследование</option>
            <option value="completed">Завершено</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Дата рождения</th>
              <th>Документ</th>
              <th>Номер дела</th>
              <th>Тип дела</th>
              <th>Статус</th>
              <th>Отдел</th>
              <th>Ответственный</th>
              {canEdit && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={canEdit ? 9 : 8} className="loading-cell">
                  Загрузка записей...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 9 : 8} className="empty-cell">
                  Записи не найдены. Добавьте первую запись.
                </td>
              </tr>
            ) : (
              records.map(record => (
              <tr key={record.id} className="table-row-editable">
                <td>
                  <div className="record-name">
                    {record.fullName}
                    {canEdit && (
                      <button 
                        className="inline-edit-btn"
                        onClick={() => setEditingRecord(record)}
                        title="Быстрое редактирование"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                </td>
                <td>{record.birthDate}</td>
                <td>{record.document}</td>
                <td>{record.caseNumber}</td>
                <td>
                  <span className={`case-badge case-${record.caseType === 'Уголовное' ? 'criminal' : 'admin'}`}>
                    {record.caseType}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${record.status === 'Завершено' ? 'completed' : 'investigation'}`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.department}</td>
                <td>{record.officer}</td>
                {canEdit && (
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-small btn-secondary"
                        onClick={() => setEditingRecord(record)}
                      >
                        Редакт.
                      </button>
                      <button 
                        className="btn btn-small btn-danger"
                        onClick={() => deleteRecord(record.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                )}
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {records.length === 0 && (
        <div className="no-data">
          <p>Записи не найдены</p>
        </div>
      )}

      {showAddForm && (
        <AddRecordForm 
          onSave={addRecord}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingRecord && (
        <EditRecordForm 
          record={editingRecord}
          onSave={updateRecord}
          onClose={() => setEditingRecord(null)}
        />
      )}
    </div>
  );
};

export default DatabaseTable;