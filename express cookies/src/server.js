import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import "dotenv/config";
import path from "node:path";
import siteRoutes from "./routes/site-routes.js";
import userRoutes from "./routes/user-routes.js";
import { checkUser } from "./middlewares/user-middleware.js";
import { authenticateJWT } from "./middlewares/auth.js";

const PORT = process.env.PORT || 3000;

// Region options for hbs
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(checkUser);

// Region
app.use(express.static("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join("src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(siteRoutes);
app.use("/user", userRoutes);
app.use('/protected-route', authenticateJWT, (req, res) => {
  res.send("This is a protected route");
});

app.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`)
);
