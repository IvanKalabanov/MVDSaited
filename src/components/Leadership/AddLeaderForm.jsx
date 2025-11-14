// src/components/Leadership/AddLeaderForm.jsx
import React, { useState } from 'react';
import './AddLeaderForm.css';

const AddLeaderForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    department: 'Штаб',
    photo: '',
    bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.full_name && formData.position) {
      onAdd(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>×</button>
        
        <h2>Добавить руководителя</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">ФИО</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Должность</label>
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
              <option value="Штаб">Штаб</option>
              <option value="ОУР">ОУР</option>
              <option value="ППСП">ППСП</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Биография</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Контакты</label>
            <input
              type="text"
              name="contacts"
              value={formData.contacts}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaderForm;