import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = (req, res, next) => {
    const token = req.session.token; // Или из заголовков, если вы используете его в заголовке Authorization

    if (!token) {
        return res.sendStatus(403); 
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user; // Сохраните информацию о пользователе для следующего middleware
        next();
    });
};