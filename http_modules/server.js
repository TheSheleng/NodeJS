import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Налаштування body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обробка GET запиту
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'front/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading form file', err);
            return res.sendStatus(500);
        }
        res.send(data);
    });
});

// Обробка POST запиту
app.post('/', (req, res) => {
    const { name, email, pwd } = req.body;

    // Формуємо дані для запису
    const data = JSON.stringify({ name, email, pwd }) + '\n';

    // Записуємо дані у файл
    fs.appendFile(path.join(__dirname, 'data.txt'), data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.sendStatus(500);
        }

        // Відправляємо статус 201 та редірект
        res.status(201).redirect('/');
    });
});

// Запускаємо сервер
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});