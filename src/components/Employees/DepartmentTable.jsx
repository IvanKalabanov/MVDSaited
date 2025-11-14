// src/components/Employees/DepartmentTable.jsx (обновляем с редактированием)
import React, { useState } from 'react';
import { updateEmployee, deleteEmployee as deleteEmployeeAPI } from '../../utils/api';
import EditEmployeeForm from './EditEmployeeForm';
import './DepartmentTable.css';

const DepartmentTable = ({ department, employees, canEdit, onEmployeeUpdate, onEmployeeDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [quickEdit, setQuickEdit] = useState(null);

  if (!department || !employees) {
    return (
      <div className="no-data">
        <p>Нет данных для отображения</p>
      </div>
    );
  }

  const updateEmployeeHandler = async (updatedEmployee) => {
    try {
      const updated = await updateEmployee(updatedEmployee.id, updatedEmployee);
      if (onEmployeeUpdate) onEmployeeUpdate(updated);
      setEditingEmployee(null);
    } catch (error) {
      console.error('Ошибка обновления сотрудника:', error);
      alert('Ошибка обновления сотрудника');
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) return;
    
    try {
      await deleteEmployeeAPI(id);
      if (onEmployeeDelete) onEmployeeDelete(id);
      alert('Сотрудник успешно удален!');
    } catch (error) {
      console.error('Ошибка удаления сотрудника:', error);
      alert('Ошибка удаления сотрудника');
    }
  };

  const handleQuickEdit = (employee, field) => {
    setQuickEdit({ employee, field, value: employee[field] });
  };

  const saveQuickEdit = () => {
    if (quickEdit) {
      updateEmployeeHandler({
        ...quickEdit.employee,
        [quickEdit.field]: quickEdit.value
      });
      setQuickEdit(null);
    }
  };

  return (
    <div className="department-section">
      <div className="department-header">
        <div className="dept-title">
          <span className="dept-icon">{department.icon}</span>
          <h2>{department.name}</h2>
        </div>
        <div className="dept-stats">
          Всего сотрудников: {employees.length}
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Звание</th>
              <th>Должность</th>
              <th>Контакты</th>
              <th>Статус</th>
              {canEdit && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="employee-row">
                <td className="employee-name">
                  <div className="name-avatar">
                    <div className="avatar-circle">
                      {(employee.full_name || employee.name || '').split(' ').map(n => n[0]).join('')}
                    </div>
                    {canEdit ? (
                      <button 
                        className="editable-name"
                        onClick={() => handleQuickEdit(employee, 'full_name')}
                      >
                        {employee.full_name || employee.name}
                      </button>
                    ) : (
                      employee.full_name || employee.name
                    )}
                  </div>
                </td>
                <td>
                  {canEdit ? (
                    <select
                      value={employee.rank}
                      onChange={(e) => updateEmployeeHandler({
                        ...employee,
                        rank: e.target.value
                      })}
                      className="inline-select"
                    >
                      <option value="Рядовой">Рядовой</option>
                      <option value="Младший сержант">Мл. сержант</option>
                      <option value="Сержант">Сержант</option>
                      <option value="Старший сержант">Ст. сержант</option>
                      <option value="Лейтенант">Лейтенант</option>
                      <option value="Старший лейтенант">Ст. лейтенант</option>
                      <option value="Капитан">Капитан</option>
                      <option value="Майор">Майор</option>
                      <option value="Подполковник">Подполковник</option>
                      <option value="Полковник">Полковник</option>
                    </select>
                  ) : (
                    <span className="rank-badge">{employee.rank}</span>
                  )}
                </td>
                <td>
                  {canEdit ? (
                    <input
                      type="text"
                      value={employee.position}
                      onChange={(e) => updateEmployeeHandler({
                        ...employee,
                        position: e.target.value
                      })}
                      className="inline-input"
                      placeholder="Должность"
                    />
                  ) : (
                    employee.position
                  )}
                </td>
                <td>
                  <div className="contact-info">
                    {canEdit ? (
                      <input
                        type="text"
                        value={employee.phone}
                        onChange={(e) => updateEmployeeHandler({
                          ...employee,
                          phone: e.target.value
                        })}
                        className="inline-input"
                        placeholder="Телефон"
                      />
                    ) : (
                      <span className="contact-phone">📞 {employee.phone}</span>
                    )}
                  </div>
                </td>
                <td>
                  {canEdit ? (
                    <select
                      value={employee.status || 'Активный'}
                      onChange={(e) => updateEmployeeHandler({
                        ...employee,
                        status: e.target.value
                      })}
                      className="inline-select status-select"
                    >
                      <option value="Активный">Активный</option>
                      <option value="Отпуск">Отпуск</option>
                      <option value="Больничный">Больничный</option>
                      <option value="Командировка">Командировка</option>
                      <option value="Неактивный">Неактивный</option>
                    </select>
                  ) : (
                    <span className={`status-indicator status-${(employee.status || 'Активный').toLowerCase()}`}>
                      {(employee.status || 'Активный') === 'Активный' && '🟢 Активный'}
                      {(employee.status || 'Активный') === 'Отпуск' && '🟡 Отпуск'}
                      {(employee.status || 'Активный') === 'Больничный' && '🔴 Больничный'}
                      {(employee.status || 'Активный') === 'Командировка' && '🔵 Командировка'}
                      {(employee.status || 'Активный') === 'Неактивный' && '⚫ Неактивный'}
                    </span>
                  )}
                </td>
                {canEdit && (
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-small btn-secondary"
                        onClick={() => setEditingEmployee(employee)}
                      >
                        Полное редакт.
                      </button>
                      <button 
                        className="btn btn-small btn-danger"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="empty-department">
          <p>В этом отделе пока нет сотрудников</p>
          {canEdit && (
            <button className="btn btn-primary">
              + Добавить первого сотрудника
            </button>
          )}
        </div>
      )}

      {editingEmployee && (
        <EditEmployeeForm 
          employee={editingEmployee}
          onSave={updateEmployeeHandler}
          onClose={() => setEditingEmployee(null)}
        />
      )}

      {quickEdit && (
        <div className="quick-edit-overlay">
          <input
            type="text"
            value={quickEdit.value}
            onChange={(e) => setQuickEdit({...quickEdit, value: e.target.value})}
            className="editable-input"
            autoFocus
          />
          <div className="quick-edit-actions">
            <button className="btn btn-small btn-primary" onClick={saveQuickEdit}>
              ✓
            </button>
            <button className="btn btn-small btn-secondary" onClick={() => setQuickEdit(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;