export const checkUser = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user.login; // Установить пользователя в локальные переменные
  } else {
    res.locals.user = null; // Установить null, если пользователь не аутентифицирован
  }
  next();
};

// Функция для выхода из системы
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Не удалось выйти из системы.");
    }
    res.redirect("/"); // Перенаправить пользователя на главную страницу после выхода
  });
};
