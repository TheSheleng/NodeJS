import { Router } from "express";
import { users } from "../data/users.js";
const siteRoutes = Router();

siteRoutes
    .get("/", (req, res) => {
        const user = req.session.user || null;
        res.render("home", {user})
    });
    
export default siteRoutes;
