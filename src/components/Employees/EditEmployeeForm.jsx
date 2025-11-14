// src/components/Employees/EditEmployeeForm.jsx
import React, { useState } from 'react';

const EditEmployeeForm = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState(employee);

  const ranks = [
    'Рядовой', 'Младший сержант', 'Сержант', 'Старший сержант',
    'Лейтенант', 'Старший лейтенант', 'Капитан', 'Майор',
    'Подполковник', 'Полковник'
  ];

  const departments = [
    { id: 'staff', name: 'Штаб' },
    { id: 'our', name: 'ОУР' },
    { id: 'ppsp', name: 'ППСП' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Редактирование сотрудника</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">ФИО *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Звание</label>
              <select
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                className="form-select"
              >
                {ranks.map(rank => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Должность *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Подразделение</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Внутренний телефон</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="internal-001"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Личный номер</label>
              <input
                type="text"
                name="badgeNumber"
                value={formData.badgeNumber || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="МВД-001"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Дата назначения</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Статус</label>
              <select
                name="status"
                value={formData.status || 'active'}
                onChange={handleChange}
                className="form-select"
              >
                <option value="active">Активный</option>
                <option value="vacation">Отпуск</option>
                <option value="sick">Больничный</option>
                <option value="mission">Командировка</option>
                <option value="inactive">Неактивный</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Дополнительная информация</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              placeholder="Дополнительные сведения о сотруднике..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;