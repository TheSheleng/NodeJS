// userController.js
import db from './db.js';

// Получение всех пользователей
export const getUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

// Получение пользователя по ID
export const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; // Возвращаем первого пользователя
};

// Создание нового пользователя
export const createUser = async (login, email, password, image) => {
  const [result] = await db.query(
    'INSERT INTO users (login, email, password, image) VALUES (?, ?, ?, ?)',
    [login, email, password, image]
  );
  return { id: result.insertId, login, email, password, image };
};

// Обновление пользователя
export const updateUser = async (id, login, email, password, image) => {
  await db.query(
    'UPDATE users SET login = ?, email = ?, password = ?, image = ? WHERE id = ?',
    [login, email, password, image, id]
  );
  return { id, login, email, password, image }; // Возвращаем обновленного пользователя
};

// Удаление пользователя
export const deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  return { message: 'User deleted successfully' };
};