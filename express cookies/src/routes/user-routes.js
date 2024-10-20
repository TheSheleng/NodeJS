import { Router } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import { logoutUser } from "../middlewares/user-middleware.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userRoutes = Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Массив для хранения пользователей
const users = [];

// Регистрация пользователя
userRoutes
  .route("/signup")
  .get((req, res) => res.render("form_register"))
  .post(async (req, res) => {
    const { login, email, password, confirm_password } = req.body;

    // Валидация данных
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Невалидный email.' });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Пароль должен быть минимум 6 символов.' });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Пароли не совпадают.' });
    }
    // Проверка, существует ли пользователь с таким email
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.render("form_register", {
        error: "Пользователь с таким email уже зарегистрирован.",
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавляем пользователя в массив
    users.push({
      login,
      email,
      password: hashedPassword,
    });

    // Устанавливаем сессию
    req.session.user = {
      login,
      email,
    };

    const token = jwt.sign({ login, email }, JWT_SECRET, { expiresIn: '1h' });
    req.session.token = token; 

    res.json({ token });
  });

// Вход в систему (страница)
userRoutes
.route("/signin")
  .get((req, res) => res.render("form_auth"))
  .post(async (req, res) => {
    const { login, password } = req.body;
    
    // Поиск пользователя по логину
    const user = users.find(user => user.login === login);
    if (!user) {
      return res.render("form_auth", { error: "Неправильный логин или пароль." });
    }

    // Проверка правильности пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("form_auth", { error: "Неправильный логин или пароль." });
    }

    // Успешный вход
    req.session.user = { login }; // Сохраняем пользователя в сессии

    const token = jwt.sign({ login: user.login, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    req.session.token = token; 

    res.json({ token });
  });

// Logout пользователя
userRoutes.get("/logout", (req, res) => {
  logoutUser(req, res); // Выход пользователя
});

export default userRoutes;
