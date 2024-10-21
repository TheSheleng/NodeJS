import { users } from "../data/users.js";
import bcrypt from "bcrypt";
import path from "node:path";

export const checkUser = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user.login;
  }
  next();
};

export const createUser = (req, res, next) => {
  if (
    req.body &&
    req.body.answer &&
    req.body.login &&
    req.body.email &&
    req.body.password &&
    req.body.confirm_password &&
    req.body.password === req.body.confirm_password
  ) {
    const { login, email, password } = req.body;
    const user = users.find((el) => el.login === login || el.email === email);
    if (!user) {
      req.body.image=login + path.extname(req.file.originalname)
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      users.push({
        id: users.length + 1,
        login: login,
        email: email,
        password: hash,
        image: req.body.image,
      });
      
      next();
      return;
    }
  }
  res.status(400).redirect("/");
};

export const authUser = (req, res, next) => {
  if (req.body && req.body.login && req.body.password) {
    const { login, password } = req.body;
    const user = users?.find((el) => el.login == login);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.body.email = user.email;
      req.body.image = user.image;
      next();
      return;
    }
  }
  return res.status(400).redirect("/");
};
