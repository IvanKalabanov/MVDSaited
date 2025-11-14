// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Авторизация
export const login = async (login, password) => {
  const response = await api.post('/auth/login', { login, password });
  return response.data;
};

export const register = async (name, login, password, role = 'user') => {
  const response = await api.post('/auth/register', { name, login, password, role });
  return response.data;
};

// Пользователи
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/users/${userId}/role`, { role });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

// Заявления
export const getApplications = async (params = {}) => {
  const response = await api.get('/applications', { params });
  return response.data;
};

export const createApplication = async (applicationData) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

export const updateApplication = async (id, updates) => {
  const response = await api.put(`/applications/${id}`, updates);
  return response.data;
};

export const addApplicationResponse = async (applicationId, responseData) => {
  const response = await api.post(`/applications/${applicationId}/responses`, responseData);
  return response.data;
};

// Новости
export const getNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

export const createNews = async (newsData) => {
  const response = await api.post('/news', newsData);
  return response.data;
};

export const deleteNews = async (newsId) => {
  const response = await api.delete(`/news/${newsId}`);
  return response.data;
};

// База данных нарушителей
export const getDatabaseRecords = async () => {
  const response = await api.get('/database');
  return response.data;
};

export const createDatabaseRecord = async (recordData) => {
  const response = await api.post('/database', recordData);
  return response.data;
};

export const updateDatabaseRecord = async (id, updates) => {
  const response = await api.put(`/database/${id}`, updates);
  return response.data;
};

export const deleteDatabaseRecord = async (id) => {
  const response = await api.delete(`/database/${id}`);
  return response.data;
};

// Сотрудники
export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id, updates) => {
  const response = await api.put(`/employees/${id}`, updates);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

// Руководители
export const getLeaders = async () => {
  const response = await api.get('/leaders');
  return response.data;
};

export const createLeader = async (leaderData) => {
  const response = await api.post('/leaders', leaderData);
  return response.data;
};

export const updateLeader = async (id, updates) => {
  const response = await api.put(`/leaders/${id}`, updates);
  return response.data;
};

export const deleteLeader = async (id) => {
  const response = await api.delete(`/leaders/${id}`);
  return response.data;
};

// Статистика
export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export default api;

