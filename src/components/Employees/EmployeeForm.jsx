// src/components/Employees/EmployeeForm.jsx
import React, { useState } from 'react';

const EmployeeForm = ({ onSave, onClose, departments }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    rank: 'Рядовой',
    position: '',
    department: 'Штаб',
    phone: '',
    badge_number: '',
    start_date: '',
    status: 'Активный'
  });

  const ranks = [
    'Рядовой', 'Младший сержант', 'Сержант', 'Старший сержант',
    'Лейтенант', 'Старший лейтенант', 'Капитан', 'Майор',
    'Подполковник', 'Полковник'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.full_name && formData.position) {
      // Преобразуем department из id в название
      const departmentMap = {
        'staff': 'Штаб',
        'our': 'ОУР',
        'ppsp': 'ППСП'
      };
      const finalData = {
        ...formData,
        department: departmentMap[formData.department] || formData.department
      };
      onSave(finalData);
    }
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
        
        <h2>Добавить сотрудника</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">ФИО *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="form-input"
                placeholder="Иванов Иван Иванович"
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
                placeholder="Например: Следователь"
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
              <label className="form-label">Дата назначения</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Статус</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="active">Активный</option>
              <option value="vacation">Отпуск</option>
              <option value="sick">Больничный</option>
              <option value="inactive">Неактивный</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить сотрудника
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;