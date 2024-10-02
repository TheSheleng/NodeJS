// Импортируем зависимости с использованием синтаксиса ESM
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Получаем текущий каталог для использования с path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Настройка Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main', // Здесь задается основной макет
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Путь к папке с макетами
  }));
app.set('view engine', 'handlebars');

// Настройка статической папки для CSS и изображений
app.use(express.static(path.join(__dirname, 'public')));

// Настройка статической папки для Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

// Маршруты
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT}`);
});
