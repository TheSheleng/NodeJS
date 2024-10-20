import express from 'express';
import path from 'path';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import mailRoute from './routes/mail.mjs'; // Используем расширение .mjs
import dotenv from 'dotenv';

dotenv.config();


const app = express();

// Получаем __dirname для работы с путями в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем экземпляр handlebars
const hbs = create();

// Настройка Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware для обработки данных форм
app.use(express.urlencoded({ extended: false }));

// Подключение статических файлов из node_modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Роуты
app.use('/', mailRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
