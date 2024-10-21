import { Router } from "express";
import { authUser, createUser as createUserMiddleware } from "../middlewares/user-middleware.js";
import db from "../data/db_connection.js"; // Подключаем файл с настройками базы данных
import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "photos/",
  filename: (req, file, cb) => {
    cb(null, req.body.login + path.extname(file.originalname));
  },
});
const configMulter = multer({ storage: storage });

const userRoutes = Router();

// Получение списка пользователей
const getUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

userRoutes
  .route("/signup")
  .get((req, res) => res.render("form_register"))
  .post(configMulter.single("file"), createUserMiddleware, async (req, res) => {
    const { login, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const [result] = await db.query(
        'INSERT INTO users (login, email, password, image) VALUES (?, ?, ?, ?)',
        [login, email, password, image]
      );

      req.session.user = {
        login,
        email,
      };

      res.redirect("/");
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Server error');
    }
  });

userRoutes
  .route("/signin")
  .get((req, res) => res.render("form_auth"))
  .post(authUser, (req, res) => {
    req.session.user = {
      login: req.body.login,
      email: req.body.email,
    };
    res.redirect("/");
  });

userRoutes.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(); // уничтожение сессии
  }
  res.redirect("/");
});

userRoutes.get("/list", async (req, res) => {
  try {
    const users = await getUsers(); // Получаем пользователей из базы данных
    res.render("user_list", { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});

export default userRoutes;
